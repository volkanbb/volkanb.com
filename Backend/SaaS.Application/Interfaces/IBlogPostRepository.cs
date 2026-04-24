using SaaS.Domain.Entities;

namespace SaaS.Application.Interfaces;

public interface IBlogPostRepository
{
    Task<BlogPost?> GetByIdAsync(int id);
    Task<IEnumerable<BlogPost>> GetAllAsync();
    Task<BlogPost> AddAsync(BlogPost post);
    Task UpdateAsync(BlogPost post);
    Task DeleteAsync(int id);
}
