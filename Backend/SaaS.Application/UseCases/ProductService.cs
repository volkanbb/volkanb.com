using SaaS.Application.DTOs;
using SaaS.Application.Interfaces;

namespace SaaS.Application.UseCases;

public class ProductService : IProductService
{
    private readonly IProductRepository _repository;

    public ProductService(IProductRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<ProductDto>> GetProductsByBusinessIdAsync(int businessId)
    {
        var products = await _repository.GetByBusinessIdAsync(businessId);
        return products.Select(p => new ProductDto
        {
            Id = p.Id,
            BusinessId = p.BusinessId,
            Name = p.Name,
            Description = p.Description,
            Price = p.Price,
            ImageUrl = p.ImageUrl
        });
    }
}
