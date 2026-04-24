using SaaS.Application.DTOs;
using SaaS.Application.Interfaces;

namespace SaaS.Application.UseCases;

public class BusinessService : IBusinessService
{
    private readonly IBusinessRepository _repository;

    public BusinessService(IBusinessRepository repository)
    {
        _repository = repository;
    }

    public async Task<BusinessDto?> GetBusinessBySubdomainAsync(string subdomain)
    {
        var business = await _repository.GetBySubdomainAsync(subdomain);
        if (business == null) return null;

        return new BusinessDto
        {
            Id = business.Id,
            Name = business.Name,
            Subdomain = business.Subdomain,
            Type = business.Type.ToString()
        };
    }

    public async Task<IEnumerable<BusinessDto>> GetAllBusinessesAsync()
    {
        var businesses = await _repository.GetAllAsync();
        return businesses.Select(b => new BusinessDto
        {
            Id = b.Id,
            Name = b.Name,
            Subdomain = b.Subdomain,
            Type = b.Type.ToString()
        });
    }
}
