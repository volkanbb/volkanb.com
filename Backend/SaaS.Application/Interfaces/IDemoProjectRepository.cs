using SaaS.Domain.Entities;

namespace SaaS.Application.Interfaces;

public interface IDemoProjectRepository
{
    Task<IEnumerable<DemoProject>> GetAllAsync();
    Task<DemoProject?> GetByIdAsync(int id);
    Task AddAsync(DemoProject project);
    Task UpdateAsync(DemoProject project);
    Task DeleteAsync(int id);
}
