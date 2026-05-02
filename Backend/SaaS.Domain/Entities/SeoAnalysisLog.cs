using System.ComponentModel.DataAnnotations;

namespace SaaS.Domain.Entities;

public class SeoAnalysisLog
{
    public int Id { get; set; }
    
    [Required]
    public string Url { get; set; } = string.Empty;
    
    public int Score { get; set; }
    
    [Required]
    public string IpAddress { get; set; } = string.Empty;
    
    public DateTime AnalyzedAt { get; set; } = DateTime.UtcNow;
}
