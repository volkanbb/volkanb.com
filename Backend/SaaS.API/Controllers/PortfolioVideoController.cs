using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SaaS.Domain.Entities;
using SaaS.Infrastructure.Data;

namespace SaaS.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PortfolioVideoController : ControllerBase
{
    private readonly AppDbContext _context;

    public PortfolioVideoController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<PortfolioVideo>>> GetVideos()
    {
        return await _context.PortfolioVideos.OrderBy(v => v.Order).ToListAsync();
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<PortfolioVideo>> CreateVideo(PortfolioVideo video)
    {
        video.CreatedAt = DateTime.UtcNow;
        _context.PortfolioVideos.Add(video);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetVideos), new { id = video.Id }, video);
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> UpdateVideo(int id, PortfolioVideo video)
    {
        if (id != video.Id) return BadRequest();

        _context.Entry(video).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!VideoExists(id)) return NotFound();
            throw;
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> DeleteVideo(int id)
    {
        var video = await _context.PortfolioVideos.FindAsync(id);
        if (video == null) return NotFound();

        _context.PortfolioVideos.Remove(video);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool VideoExists(int id)
    {
        return _context.PortfolioVideos.Any(e => e.Id == id);
    }
}
