using SaaS.Application.DTOs;

namespace SaaS.Application.Interfaces;

public interface IBusinessService
{
    Task<BusinessDto?> GetBusinessBySubdomainAsync(string subdomain);
    Task<IEnumerable<BusinessDto>> GetAllBusinessesAsync();
}
