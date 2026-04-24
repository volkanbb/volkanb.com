using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SaaS.Domain.Entities;
using SaaS.Infrastructure.Data;
using System.Collections.Generic;
using System.Linq;

namespace SaaS.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContactController : ControllerBase
{
    private readonly AppDbContext _context;

    public ContactController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    [AllowAnonymous]
    public async Task<IActionResult> SubmitMessage([FromBody] ContactMessage message)
    {
        var ip = HttpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown";
        
        // Anti-spam rule: Max 5 messages per IP in the last 24 hours
        var twentyFourHoursAgo = DateTime.UtcNow.AddDays(-1);
        var messageCount = await _context.ContactMessages
            .CountAsync(m => m.IpAddress == ip && m.CreatedAt > twentyFourHoursAgo);

        if (messageCount >= 5)
        {
            return BadRequest(new { message = "Son 24 saat içinde maksimum mesaj limitine ulaştınız (5/5). Lütfen daha sonra tekrar deneyiniz." });
        }

        message.IpAddress = ip;
        message.CreatedAt = DateTime.UtcNow;
        message.IsRead = false;

        _context.ContactMessages.Add(message);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Mesajınız başarıyla iletildi. En kısa sürede dönüş sağlanacaktır." });
    }

    [HttpGet]
    [Authorize]
    public async Task<ActionResult<IEnumerable<ContactMessage>>> GetMessages()
    {
        return await _context.ContactMessages
            .Where(m => !m.IsDeleted) // Filter out soft-deleted messages
            .OrderByDescending(m => m.CreatedAt)
            .ToListAsync();
    }

    [HttpPut("{id}/read")]
    [Authorize]
    public async Task<IActionResult> MarkAsRead(int id)
    {
        var message = await _context.ContactMessages.FindAsync(id);
        if (message == null || message.IsDeleted) return NotFound();

        message.IsRead = true;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> DeleteMessage(int id)
    {
        var message = await _context.ContactMessages.FindAsync(id);
        if (message == null) return NotFound();

        // Soft delete: don't remove from DB so spam protection keeps counting it
        message.IsDeleted = true; 
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
