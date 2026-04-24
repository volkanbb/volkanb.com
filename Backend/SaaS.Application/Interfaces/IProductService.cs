using SaaS.Application.DTOs;

namespace SaaS.Application.Interfaces;

public interface IProductService
{
    Task<IEnumerable<ProductDto>> GetProductsByBusinessIdAsync(int businessId);
}
