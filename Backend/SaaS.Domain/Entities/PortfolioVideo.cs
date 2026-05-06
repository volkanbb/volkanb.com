namespace SaaS.Domain.Entities;

public class PortfolioVideo
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string YoutubeUrl { get; set; } = string.Empty;
    public bool IsVertical { get; set; }
    public int Order { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
