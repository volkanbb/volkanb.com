using SaaS.Domain.Entities;

namespace SaaS.Application.Interfaces;

public interface ISiteContentRepository
{
    Task<SiteContent?> GetBySectionAsync(string sectionName);
    Task<IEnumerable<SiteContent>> GetAllAsync();
    Task UpdateAsync(SiteContent content);
    Task UpsertBySectionAsync(string sectionName, SiteContent content);
}
