using SaaS.Domain.Enums;

namespace SaaS.Domain.Entities;

public class Business
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Subdomain { get; set; } = string.Empty;
    public BusinessType Type { get; set; }
    public ICollection<Product> Products { get; set; } = new List<Product>();
    public ICollection<Service> Services { get; set; } = new List<Service>();
    public ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
}
