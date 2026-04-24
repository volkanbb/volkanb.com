namespace SaaS.Domain.Entities;

public class Product
{
    public int Id { get; set; }
    public int BusinessId { get; set; }
    public Business? Business { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
}
