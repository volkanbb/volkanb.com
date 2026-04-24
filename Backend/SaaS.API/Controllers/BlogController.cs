using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SaaS.Application.Interfaces;
using SaaS.Domain.Entities;

namespace SaaS.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BlogController : ControllerBase
{
    private readonly IBlogPostRepository _repository;

    public BlogController(IBlogPostRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var posts = await _repository.GetAllAsync();
        return Ok(posts);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var post = await _repository.GetByIdAsync(id);
        if (post == null) return NotFound();
        return Ok(post);
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] BlogPost post)
    {
        post.CreatedAt = DateTime.UtcNow;
        var created = await _repository.AddAsync(post);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [Authorize]
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] BlogPost post)
    {
        if (id != post.Id) return BadRequest();
        await _repository.UpdateAsync(post);
        return Ok(post);
    }

    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _repository.DeleteAsync(id);
        return NoContent();
    }
}
