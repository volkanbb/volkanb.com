using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Webp;
using SixLabors.ImageSharp.Processing;

namespace SaaS.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MediaController : ControllerBase
{
    private readonly IWebHostEnvironment _env;

    public MediaController(IWebHostEnvironment env)
    {
        _env = env;
    }

    [Authorize]
    [HttpPost("Upload")]
    public async Task<IActionResult> UploadMedia(IFormFile file)
    {
        if (file == null || file.Length == 0)
            return BadRequest("Dosya bulunamadı.");

        var extension = Path.GetExtension(file.FileName).ToLower();
        var isPdf = extension == ".pdf";
        
        var uploadsPath = Path.Combine(_env.ContentRootPath, "wwwroot", "uploads");
        if (!Directory.Exists(uploadsPath))
            Directory.CreateDirectory(uploadsPath);

        var fileName = isPdf ? $"{Guid.NewGuid()}.pdf" : $"{Guid.NewGuid()}.webp";
        var filePath = Path.Combine(uploadsPath, fileName);

        if (isPdf)
        {
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
        }
        else
        {
            using (var stream = file.OpenReadStream())
            {
                using (var image = await Image.LoadAsync(stream))
                {
                    if (image.Width > 1920)
                    {
                        image.Mutate(x => x.Resize(new ResizeOptions
                        {
                            Mode = ResizeMode.Max,
                            Size = new Size(1920, 1920)
                        }));
                    }

                    await image.SaveAsWebpAsync(filePath, new WebpEncoder { Quality = 80 });
                }
            }
        }

        return Ok(new { url = $"/uploads/{fileName}" });
    }
}
