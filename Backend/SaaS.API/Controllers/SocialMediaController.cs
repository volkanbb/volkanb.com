using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SaaS.Domain.Entities;
using SaaS.Infrastructure.Data;
using Microsoft.AspNetCore.Cors;

namespace SaaS.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("AllowAll")]
    public class SocialMediaController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SocialMediaController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SocialMedia>>> GetSocialMedias()
        {
            return await _context.SocialMedias
                .Where(s => s.IsActive)
                .OrderBy(s => s.Order)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SocialMedia>> GetSocialMedia(int id)
        {
            var social = await _context.SocialMedias.FindAsync(id);
            if (social == null) return NotFound();
            return social;
        }

        [HttpPost]
        public async Task<ActionResult<SocialMedia>> PostSocialMedia(SocialMedia social)
        {
            _context.SocialMedias.Add(social);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetSocialMedia), new { id = social.Id }, social);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutSocialMedia(int id, SocialMedia social)
        {
            if (id != social.Id) return BadRequest();
            _context.Entry(social).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSocialMedia(int id)
        {
            var social = await _context.SocialMedias.FindAsync(id);
            if (social == null) return NotFound();
            _context.SocialMedias.Remove(social);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
