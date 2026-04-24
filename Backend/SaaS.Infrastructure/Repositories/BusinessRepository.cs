using Microsoft.EntityFrameworkCore;
using SaaS.Application.Interfaces;
using SaaS.Domain.Entities;
using SaaS.Infrastructure.Data;

namespace SaaS.Infrastructure.Repositories;

public class BusinessRepository : IBusinessRepository
{
    private readonly AppDbContext _context;

    public BusinessRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Business?> GetByIdAsync(int id)
    {
        return await _context.Businesses.FindAsync(id);
    }

    public async Task<Business?> GetBySubdomainAsync(string subdomain)
    {
        return await _context.Businesses
            .Include(b => b.Products)
            .Include(b => b.Services)
            .FirstOrDefaultAsync(b => b.Subdomain == subdomain);
    }

    public async Task<IEnumerable<Business>> GetAllAsync()
    {
        return await _context.Businesses.ToListAsync();
    }

    public async Task<Business> AddAsync(Business business)
    {
        _context.Businesses.Add(business);
        await _context.SaveChangesAsync();
        return business;
    }

    public async Task UpdateAsync(Business business)
    {
        _context.Businesses.Update(business);
        await _context.SaveChangesAsync();
    }
}
