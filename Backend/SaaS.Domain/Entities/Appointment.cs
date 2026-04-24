namespace SaaS.Domain.Entities;

public class Appointment
{
    public int Id { get; set; }
    public int BusinessId { get; set; }
    public Business? Business { get; set; }
    public string CustomerName { get; set; } = string.Empty;
    public string CustomerPhone { get; set; } = string.Empty;
    public DateTime Date { get; set; }
}
