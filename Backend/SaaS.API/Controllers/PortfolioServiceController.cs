using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SaaS.Domain.Entities;
using SaaS.Infrastructure.Data;

namespace SaaS.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PortfolioServiceController : ControllerBase
{
    private readonly AppDbContext _context;

    public PortfolioServiceController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<PortfolioService>>> GetServices()
    {
        return await _context.PortfolioServices.ToListAsync();
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<PortfolioService>> CreateService(PortfolioService service)
    {
        _context.PortfolioServices.Add(service);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetServices), new { id = service.Id }, service);
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> UpdateService(int id, PortfolioService service)
    {
        if (id != service.Id) return BadRequest();

        _context.Entry(service).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!ServiceExists(id)) return NotFound();
            throw;
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> DeleteService(int id)
    {
        var service = await _context.PortfolioServices.FindAsync(id);
        if (service == null) return NotFound();

        _context.PortfolioServices.Remove(service);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool ServiceExists(int id)
    {
        return _context.PortfolioServices.Any(e => e.Id == id);
    }
}
