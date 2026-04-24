using Microsoft.AspNetCore.Mvc;
using SaaS.Application.DTOs;
using SaaS.Application.Interfaces;

namespace SaaS.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BusinessController : ControllerBase
{
    private readonly IBusinessService _businessService;

    public BusinessController(IBusinessService businessService)
    {
        _businessService = businessService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<BusinessDto>>> GetAll()
    {
        var businesses = await _businessService.GetAllBusinessesAsync();
        return Ok(businesses);
    }

    [HttpGet("by-subdomain/{subdomain}")]
    public async Task<ActionResult<BusinessDto>> GetBySubdomain(string subdomain)
    {
        var business = await _businessService.GetBusinessBySubdomainAsync(subdomain);
        if (business == null)
            return NotFound();

        return Ok(business);
    }
}
