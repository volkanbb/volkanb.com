using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using SaaS.Application.DTOs;
using SaaS.Application.Interfaces;
using System.Net;

namespace SaaS.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class SeoController : ControllerBase
{
    private readonly ISeoAnalysisService _seoService;
    private readonly IMemoryCache _cache;
    private static readonly TimeSpan LimitDuration = TimeSpan.FromHours(24);

    public SeoController(ISeoAnalysisService seoService, IMemoryCache cache)
    {
        _seoService = seoService;
        _cache = cache;
    }

    public class AnalyzeRequest
    {
        public string Url { get; set; } = string.Empty;
    }

    [HttpPost("analyze")]
    public async Task<IActionResult> Analyze([FromBody] AnalyzeRequest request)
    {
        var ipAddress = HttpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown";
        var cacheKey = $"SeoLimit_{ipAddress}";

        // 1. IP Rate Limiting Check
        if (_cache.TryGetValue(cacheKey, out DateTime nextAllowedTime))
        {
            if (DateTime.UtcNow < nextAllowedTime)
            {
                var remaining = nextAllowedTime - DateTime.UtcNow;
                return StatusCode(StatusCodes.Status429TooManyRequests, new 
                { 
                    Message = "Günlük ücretsiz SEO analizi hakkınızı doldurdunuz.",
                    NextAllowedTime = nextAllowedTime,
                    RemainingSeconds = remaining.TotalSeconds
                });
            }
        }

        // 2. SSRF & URL Validation
        if (!Uri.TryCreate(request.Url, UriKind.Absolute, out var uriResult) 
            || (uriResult.Scheme != Uri.UriSchemeHttp && uriResult.Scheme != Uri.UriSchemeHttps))
        {
            return BadRequest(new { Message = "Lütfen geçerli bir HTTP/HTTPS adresi girin." });
        }

        if (uriResult.IsLoopback || uriResult.HostNameType == UriHostNameType.IPv4 || uriResult.HostNameType == UriHostNameType.IPv6)
        {
            // Simple block for local IP scanning
            return BadRequest(new { Message = "Güvenlik nedeniyle IP bazlı veya yerel ağ adresleri analiz edilemez." });
        }

        // 3. Perform Analysis
        var result = await _seoService.AnalyzeUrlAsync(request.Url);

        // 4. Update Limit (Set next allowed time)
        var newNextAllowedTime = DateTime.UtcNow.Add(LimitDuration);
        _cache.Set(cacheKey, newNextAllowedTime, LimitDuration);

        return Ok(result);
    }
}
