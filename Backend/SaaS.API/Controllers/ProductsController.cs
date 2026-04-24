using Microsoft.AspNetCore.Mvc;
using SaaS.Application.DTOs;
using SaaS.Application.Interfaces;

namespace SaaS.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IProductService _productService;

    public ProductsController(IProductService productService)
    {
        _productService = productService;
    }

    [HttpGet("business/{businessId}")]
    public async Task<ActionResult<IEnumerable<ProductDto>>> GetByBusinessId(int businessId)
    {
        var products = await _productService.GetProductsByBusinessIdAsync(businessId);
        return Ok(products);
    }
}
