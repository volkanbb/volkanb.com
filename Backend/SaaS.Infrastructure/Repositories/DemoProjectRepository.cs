using Microsoft.EntityFrameworkCore;
using SaaS.Application.Interfaces;
using SaaS.Domain.Entities;
using SaaS.Infrastructure.Data;

namespace SaaS.Infrastructure.Repositories;

public class DemoProjectRepository : IDemoProjectRepository
{
    private readonly AppDbContext _context;

    public DemoProjectRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<DemoProject>> GetAllAsync()
    {
        return await _context.DemoProjects.ToListAsync();
    }

    public async Task<DemoProject?> GetByIdAsync(int id)
    {
        return await _context.DemoProjects.FindAsync(id);
    }

    public async Task AddAsync(DemoProject project)
    {
        _context.DemoProjects.Add(project);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(DemoProject project)
    {
        _context.DemoProjects.Update(project);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var project = await _context.DemoProjects.FindAsync(id);
        if (project != null)
        {
            _context.DemoProjects.Remove(project);
            await _context.SaveChangesAsync();
        }
    }
}
