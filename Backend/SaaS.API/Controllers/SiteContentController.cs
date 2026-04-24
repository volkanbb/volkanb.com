using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SaaS.Application.Interfaces;
using SaaS.Domain.Entities;

namespace SaaS.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SiteContentController : ControllerBase
{
    private readonly ISiteContentRepository _repository;

    public SiteContentController(ISiteContentRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var contents = await _repository.GetAllAsync();
        return Ok(contents);
    }

    [HttpGet("{sectionName}")]
    public async Task<IActionResult> GetBySection(string sectionName)
    {
        var content = await _repository.GetBySectionAsync(sectionName);
        if (content == null)
            return NotFound();
        return Ok(content);
    }

    [Authorize]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateContent(int id, [FromBody] SiteContent updatedContent)
    {
        if (id != updatedContent.Id)
            return BadRequest();
            
        await _repository.UpdateAsync(updatedContent);
        return Ok(updatedContent);
    }

    [Authorize]
    [HttpPost("upsert/{sectionName}")]
    public async Task<IActionResult> Upsert(string sectionName, [FromBody] SiteContent content)
    {
        await _repository.UpsertBySectionAsync(sectionName, content);
        return Ok(content);
    }
}
