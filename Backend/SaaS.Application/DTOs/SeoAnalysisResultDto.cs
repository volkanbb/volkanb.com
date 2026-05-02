namespace SaaS.Application.DTOs;

public class SeoAnalysisResultDto
{
    public string Url { get; set; } = string.Empty;
    public int Score { get; set; }
    
    // Categorized Scores
    public int TechnicalScore { get; set; }
    public int ContentScore { get; set; }
    public int PerformanceScore { get; set; }

    // On-Page SEO
    public string? Title { get; set; }
    public int TitleLength { get; set; }
    public bool HasMetaDescription { get; set; }
    public int WordCount { get; set; }
    public string H1H6Structure { get; set; } = string.Empty;
    public int ImagesWithoutAltCount { get; set; }
    
    // Technical SEO
    public int HttpStatusCode { get; set; }
    public bool IsHttps { get; set; }
    public double PageLoadTimeMs { get; set; }
    public bool HasMobileViewport { get; set; }
    public bool HasRobotsTxt { get; set; }
    public bool HasSitemapXml { get; set; }

    // Links
    public List<string> InternalLinksChecked { get; set; } = new();

    // Issues & Suggestions
    public List<SeoIssueDto> Issues { get; set; } = new();
}

public class SeoIssueDto
{
    public string Type { get; set; } = "Info"; // Critical, Warning, Info
    public string Message { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty; // Technical, Content, Performance
}
