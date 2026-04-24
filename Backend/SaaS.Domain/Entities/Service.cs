namespace SaaS.Domain.Entities;

public class Service
{
    public int Id { get; set; }
    public int BusinessId { get; set; }
    public Business? Business { get; set; }
    public string Name { get; set; } = string.Empty;
    public int DurationMinutes { get; set; }
    public decimal Price { get; set; }
}
