using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SaaS.Application.Interfaces;
using SaaS.Domain.Entities;

namespace SaaS.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DemoProjectController : ControllerBase
{
    private readonly IDemoProjectRepository _repository;

    public DemoProjectController(IDemoProjectRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var projects = await _repository.GetAllAsync();
        return Ok(projects);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var project = await _repository.GetByIdAsync(id);
        if (project == null) return NotFound();
        return Ok(project);
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> Create(DemoProject project)
    {
        await _repository.AddAsync(project);
        return CreatedAtAction(nameof(GetById), new { id = project.Id }, project);
    }

    [Authorize]
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, DemoProject project)
    {
        if (id != project.Id) return BadRequest();
        await _repository.UpdateAsync(project);
        return Ok(project);
    }

    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _repository.DeleteAsync(id);
        return NoContent();
    }
}
