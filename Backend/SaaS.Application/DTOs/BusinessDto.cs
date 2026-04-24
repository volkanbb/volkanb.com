using SaaS.Domain.Enums;

namespace SaaS.Application.DTOs;

public class BusinessDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Subdomain { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
}
