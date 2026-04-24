namespace SaaS.Domain.Entities;

public class SiteContent
{
    public int Id { get; set; }
    public string SectionName { get; set; } = string.Empty; // e.g. "AboutMe"
    public string Title { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public string? ImageUrl { get; set; }
}
