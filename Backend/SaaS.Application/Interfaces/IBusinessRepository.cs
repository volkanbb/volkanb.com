using SaaS.Domain.Entities;

namespace SaaS.Application.Interfaces;

public interface IBusinessRepository
{
    Task<Business?> GetByIdAsync(int id);
    Task<Business?> GetBySubdomainAsync(string subdomain);
    Task<IEnumerable<Business>> GetAllAsync();
    Task<Business> AddAsync(Business business);
    Task UpdateAsync(Business business);
}
