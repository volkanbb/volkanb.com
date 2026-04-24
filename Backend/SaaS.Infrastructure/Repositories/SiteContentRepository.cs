using Microsoft.EntityFrameworkCore;
using SaaS.Application.Interfaces;
using SaaS.Domain.Entities;
using SaaS.Infrastructure.Data;

namespace SaaS.Infrastructure.Repositories;

public class SiteContentRepository : ISiteContentRepository
{
    private readonly AppDbContext _context;

    public SiteContentRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<SiteContent?> GetBySectionAsync(string sectionName)
    {
        return await _context.SiteContents.FirstOrDefaultAsync(s => s.SectionName == sectionName);
    }

    public async Task<IEnumerable<SiteContent>> GetAllAsync()
    {
        return await _context.SiteContents.ToListAsync();
    }

    public async Task UpdateAsync(SiteContent content)
    {
        _context.SiteContents.Update(content);
        await _context.SaveChangesAsync();
    }

    public async Task UpsertBySectionAsync(string sectionName, SiteContent content)
    {
        var existing = await _context.SiteContents.FirstOrDefaultAsync(s => s.SectionName == sectionName);
        if (existing == null)
        {
            content.SectionName = sectionName;
            _context.SiteContents.Add(content);
        }
        else
        {
            existing.Title = content.Title;
            existing.Content = content.Content;
            existing.ImageUrl = content.ImageUrl;
            _context.SiteContents.Update(existing);
        }
        await _context.SaveChangesAsync();
    }
}
