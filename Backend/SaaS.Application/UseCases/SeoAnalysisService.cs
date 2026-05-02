using System.Diagnostics;
using System.Text.RegularExpressions;
using HtmlAgilityPack;
using SaaS.Application.DTOs;
using SaaS.Application.Interfaces;

namespace SaaS.Application.UseCases;

public class SeoAnalysisService : ISeoAnalysisService
{
    private readonly HttpClient _httpClient;

    public SeoAnalysisService()
    {
        _httpClient = new HttpClient();
        _httpClient.Timeout = TimeSpan.FromSeconds(5);
        _httpClient.DefaultRequestHeaders.Add("User-Agent", "VolkanB-SEO-Analyzer/1.0");
    }

    public async Task<SeoAnalysisResultDto> AnalyzeUrlAsync(string url)
    {
        var result = new SeoAnalysisResultDto { Url = url, IsHttps = url.StartsWith("https") };
        var uri = new Uri(url);

        try
        {
            var sw = Stopwatch.StartNew();
            var response = await _httpClient.GetAsync(url);
            sw.Stop();

            result.HttpStatusCode = (int)response.StatusCode;
            result.PageLoadTimeMs = sw.ElapsedMilliseconds;

            if (result.HttpStatusCode != 200)
            {
                result.Issues.Add(new SeoIssueDto { Type = "Critical", Message = $"HTTP Status {result.HttpStatusCode}. Ensure page returns 200 OK.", Category = "Technical" });
                CalculateScore(result);
                return result;
            }

            var htmlContent = await response.Content.ReadAsStringAsync();
            var doc = new HtmlDocument();
            doc.LoadHtml(htmlContent);

            AnalyzeOnPage(doc, result);
            await AnalyzeTechnicalChecks(uri, result);
            AnalyzeInternalLinks(doc, uri, result);

            CalculateScore(result);
        }
        catch (TaskCanceledException)
        {
            result.Issues.Add(new SeoIssueDto { Type = "Critical", Message = "Request timeout. Page took too long to respond (limit: 5s).", Category = "Performance" });
        }
        catch (Exception ex)
        {
            result.Issues.Add(new SeoIssueDto { Type = "Critical", Message = $"Failed to analyze URL: {ex.Message}", Category = "Technical" });
        }

        return result;
    }

    private void AnalyzeOnPage(HtmlDocument doc, SeoAnalysisResultDto result)
    {
        var titleNode = doc.DocumentNode.SelectSingleNode("//title");
        if (titleNode != null)
        {
            result.Title = titleNode.InnerText.Trim();
            result.TitleLength = result.Title.Length;
            if (result.TitleLength < 30 || result.TitleLength > 60)
            {
                result.Issues.Add(new SeoIssueDto { Type = "Warning", Message = $"Title length is {result.TitleLength} characters. Recommended: 30-60 characters.", Category = "Content" });
            }
        }
        else
        {
            result.Issues.Add(new SeoIssueDto { Type = "Critical", Message = "Title tag is missing.", Category = "Content" });
        }

        var metaDescNode = doc.DocumentNode.SelectSingleNode("//meta[@name='description']");
        if (metaDescNode != null && !string.IsNullOrWhiteSpace(metaDescNode.GetAttributeValue("content", "")))
        {
            result.HasMetaDescription = true;
            var descLength = metaDescNode.GetAttributeValue("content", "").Length;
            if (descLength < 70 || descLength > 160)
            {
                result.Issues.Add(new SeoIssueDto { Type = "Warning", Message = $"Meta description length is {descLength} chars. Recommended: 70-160 characters.", Category = "Content" });
            }
        }
        else
        {
            result.Issues.Add(new SeoIssueDto { Type = "Critical", Message = "Meta description is missing.", Category = "Content" });
        }

        int h1Count = doc.DocumentNode.SelectNodes("//h1")?.Count ?? 0;
        int h2Count = doc.DocumentNode.SelectNodes("//h2")?.Count ?? 0;
        result.H1H6Structure = $"H1: {h1Count}, H2: {h2Count}";
        
        if (h1Count == 0)
        {
            result.Issues.Add(new SeoIssueDto { Type = "Critical", Message = "No H1 tag found. Page should have exactly one H1 tag.", Category = "Content" });
        }
        else if (h1Count > 1)
        {
            result.Issues.Add(new SeoIssueDto { Type = "Warning", Message = $"Found {h1Count} H1 tags. It is generally recommended to have only one.", Category = "Content" });
        }

        var imageNodes = doc.DocumentNode.SelectNodes("//img");
        if (imageNodes != null)
        {
            foreach (var img in imageNodes)
            {
                var alt = img.GetAttributeValue("alt", null);
                if (string.IsNullOrWhiteSpace(alt))
                {
                    result.ImagesWithoutAltCount++;
                }
            }
            if (result.ImagesWithoutAltCount > 0)
            {
                result.Issues.Add(new SeoIssueDto { Type = "Warning", Message = $"{result.ImagesWithoutAltCount} images are missing 'alt' attributes.", Category = "Content" });
            }
        }

        // Simple word count
        var textContent = doc.DocumentNode.InnerText;
        // Basic cleanup
        textContent = Regex.Replace(textContent, @"<style[^>]*>[\s\S]*?</style>", string.Empty, RegexOptions.IgnoreCase);
        textContent = Regex.Replace(textContent, @"<script[^>]*>[\s\S]*?</script>", string.Empty, RegexOptions.IgnoreCase);
        
        var words = textContent.Split(new[] { ' ', '\r', '\n', '\t' }, StringSplitOptions.RemoveEmptyEntries);
        result.WordCount = words.Length;

        if (result.WordCount < 300)
        {
            result.Issues.Add(new SeoIssueDto { Type = "Warning", Message = $"Word count is low ({result.WordCount}). Try to have at least 300 words.", Category = "Content" });
        }

        var viewportNode = doc.DocumentNode.SelectSingleNode("//meta[@name='viewport']");
        result.HasMobileViewport = viewportNode != null;
        if (!result.HasMobileViewport)
        {
            result.Issues.Add(new SeoIssueDto { Type = "Critical", Message = "Viewport meta tag is missing. Page is not optimized for mobile devices.", Category = "Technical" });
        }
    }

    private async Task AnalyzeTechnicalChecks(Uri uri, SeoAnalysisResultDto result)
    {
        try
        {
            var robotsUrl = new Uri(uri, "/robots.txt");
            var robotsResponse = await _httpClient.GetAsync(robotsUrl);
            result.HasRobotsTxt = robotsResponse.IsSuccessStatusCode;
            if (!result.HasRobotsTxt)
            {
                result.Issues.Add(new SeoIssueDto { Type = "Info", Message = "robots.txt file was not found.", Category = "Technical" });
            }

            var sitemapUrl = new Uri(uri, "/sitemap.xml");
            var sitemapResponse = await _httpClient.GetAsync(sitemapUrl);
            result.HasSitemapXml = sitemapResponse.IsSuccessStatusCode;
            if (!result.HasSitemapXml)
            {
                result.Issues.Add(new SeoIssueDto { Type = "Info", Message = "sitemap.xml file was not found.", Category = "Technical" });
            }
        }
        catch
        {
            // Ignore errors for these optional checks
        }
    }

    private void AnalyzeInternalLinks(HtmlDocument doc, Uri baseUri, SeoAnalysisResultDto result)
    {
        var links = doc.DocumentNode.SelectNodes("//a[@href]");
        if (links == null) return;

        var internalLinks = new HashSet<string>();
        foreach (var link in links)
        {
            var href = link.GetAttributeValue("href", "");
            if (string.IsNullOrWhiteSpace(href) || href.StartsWith("#") || href.StartsWith("javascript:")) continue;

            try
            {
                var absUri = new Uri(baseUri, href);
                if (absUri.Host == baseUri.Host)
                {
                    internalLinks.Add(absUri.ToString());
                    if (internalLinks.Count >= 5) break; // Limit internal link check
                }
            }
            catch
            {
                // Ignore parsing errors
            }
        }

        result.InternalLinksChecked = internalLinks.ToList();
    }

    private void CalculateScore(SeoAnalysisResultDto result)
    {
        result.TechnicalScore = 100;
        result.ContentScore = 100;
        result.PerformanceScore = 100;

        if (result.HttpStatusCode != 200) result.TechnicalScore -= 50;
        if (!result.IsHttps) result.TechnicalScore -= 20;
        if (!result.HasMobileViewport) result.TechnicalScore -= 30;
        if (!result.HasRobotsTxt) result.TechnicalScore -= 5;
        if (!result.HasSitemapXml) result.TechnicalScore -= 5;

        if (string.IsNullOrEmpty(result.Title)) result.ContentScore -= 30;
        else if (result.TitleLength < 30 || result.TitleLength > 60) result.ContentScore -= 10;
        
        if (!result.HasMetaDescription) result.ContentScore -= 30;
        
        if (result.H1H6Structure.Contains("H1: 0")) result.ContentScore -= 20;
        if (result.ImagesWithoutAltCount > 0) result.ContentScore -= (result.ImagesWithoutAltCount * 5); // Max out implicitly
        if (result.WordCount < 300) result.ContentScore -= 15;

        if (result.PageLoadTimeMs > 2000) result.PerformanceScore -= 20;
        if (result.PageLoadTimeMs > 4000) result.PerformanceScore -= 30;
        
        // Clamp scores
        result.TechnicalScore = Math.Max(0, result.TechnicalScore);
        result.ContentScore = Math.Max(0, result.ContentScore);
        result.PerformanceScore = Math.Max(0, result.PerformanceScore);

        result.Score = (int)((result.TechnicalScore * 0.4) + (result.ContentScore * 0.4) + (result.PerformanceScore * 0.2));
    }
}
