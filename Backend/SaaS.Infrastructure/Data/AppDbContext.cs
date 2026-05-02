using Microsoft.EntityFrameworkCore;
using SaaS.Domain.Entities;
using SaaS.Domain.Enums;

namespace SaaS.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Business> Businesses { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<Service> Services { get; set; }
    public DbSet<Appointment> Appointments { get; set; }
    public DbSet<AdminUser> AdminUsers { get; set; }
    public DbSet<SiteContent> SiteContents { get; set; }
    public DbSet<BlogPost> BlogPosts { get; set; }
    public DbSet<DemoProject> DemoProjects { get; set; }
    public DbSet<ContactMessage> ContactMessages { get; set; }
    public DbSet<PortfolioService> PortfolioServices { get; set; }
    public DbSet<SeoAnalysisLog> SeoAnalysisLogs { get; set; }

    public DbSet<SocialMedia> SocialMedias { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        modelBuilder.Entity<SocialMedia>().HasData(
            new SocialMedia { Id = 1, PlatformName = "YouTube", Url = "https://youtube.com", IconSvg = "<svg viewBox=\"0 0 24 24\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z\"/></svg>", BrandColor = "#FF0000", Order = 1, IsActive = true },
            new SocialMedia { Id = 3, PlatformName = "Instagram", Url = "https://instagram.com", IconSvg = "<svg viewBox=\"0 0 24 24\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849s-.011 3.585-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.849-.07c-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849s.012-3.584.07-4.849c.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4.162 4.162 0 1 1 0-8.324 4.162 4.162 0 0 1 0 8.324zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z\"/></svg>", BrandColor = "#E4405F", Order = 3, IsActive = true },
            new SocialMedia { Id = 4, PlatformName = "LinkedIn", Url = "https://linkedin.com", IconSvg = "<svg viewBox=\"0 0 24 24\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z\"/></svg>", BrandColor = "#0A66C2", Order = 4, IsActive = true },
            new SocialMedia { Id = 5, PlatformName = "WhatsApp", Url = "https://wa.me/905000000000", IconSvg = "<svg viewBox=\"0 0 24 24\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z\"/></svg>", BrandColor = "#25d366", Order = 5, IsActive = true },
            new SocialMedia { Id = 6, PlatformName = "GitHub", Url = "https://github.com/volkanbb", IconSvg = "<svg fill=\"#ffffff\" viewBox=\"0 -0.5 25 25\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"m12.301 0h.093c2.242 0 4.34.613 6.137 1.68l-.055-.031c1.871 1.094 3.386 2.609 4.449 4.422l.031.058c1.04 1.769 1.654 3.896 1.654 6.166 0 5.406-3.483 10-8.327 11.658l-.087.026c-.063.02-.135.031-.209.031-.162 0-.312-.054-.433-.144l.002.001c-.128-.115-.208-.281-.208-.466 0-.005 0-.01 0-.014v.001q0-.048.008-1.226t.008-2.154c.007-.075.011-.161.011-.249 0-.792-.323-1.508-.844-2.025.618-.061 1.176-.163 1.718-.305l-.076.017c.573-.16 1.073-.373 1.537-.642l-.031.017c.508-.28.938-.636 1.292-1.058l.006-.007c.372-.476.663-1.036.84-1.645l.009-.035c.209-.683.329-1.468.329-2.281 0-.045 0-.091-.001-.136v.007c0-.022.001-.047.001-.072 0-1.248-.482-2.383-1.269-3.23l.003.003c.168-.44.265-.948.265-1.479 0-.649-.145-1.263-.404-1.814l.011.026c-.115-.022-.246-.035-.381-.035-.334 0-.649.078-.929.216l.012-.005c-.568.21-1.054.448-1.512.726l.038-.022-.609.384c-.922-.264-1.981-.416-3.075-.416s-2.153.152-3.157.436l.081-.02q-.256-.176-.681-.433c-.373-.214-.814-.421-1.272-.595l-.066-.022c-.293-.154-.64-.244-1.009-.244-.124 0-.246.01-.364.03l.013-.002c-.248.524-.393 1.139-.393 1.788 0 .531.097 1.04.275 1.509l-.01-.029c-.785.844-1.266 1.979-1.266 3.227 0 .025 0 .051.001.076v-.004c-.001.039-.001.084-.001.13 0 .809.12 1.591.344 2.327l-.015-.057c.189.643.476 1.202.85 1.693l-.009-.013c.354.435.782.793 1.267 1.062l.022.011c.432.252.933.465 1.46.614l.046.011c.466.125 1.024.227 1.595.284l.046.004c-.431.428-.718 1-.784 1.638l-.001.012c-.207.101-.448.183-.699.236l-.021.004c-.256.051-.549.08-.85.08-.022 0-.044 0-.066 0h.003c-.394-.008-.756-.136-1.055-.348l.006.004c-.371-.259-.671-.595-.881-.986l-.007-.015c-.198-.336-.459-.614-.768-.827l-.009-.006c-.225-.169-.49-.301-.776-.38l-.016-.004-.32-.048c-.023-.002-.05-.003-.077-.003-.14 0-.273.028-.394.077l.007-.003q-.128.072-.08.184c.039.086.087.16.145.225l-.001-.001c.061.072.13.135.205.19l.003.002.112.08c.283.148.516.354.693.603l.004.006c.191.237.359.505.494.792l.01.024.16.368c.135.402.38.738.7.981l.005.004c.3.234.662.402 1.057.478l.016.002c.33.064.714.104 1.106.112h.007c.045.002.097.002.15.002.261 0 .517-.021.767-.062l-.027.004.368-.064q0 .609.008 1.418t.008.873v.014c0 .185-.08.351-.208.466h-.001c-.119.089-.268.143-.431.143-.075 0-.147-.011-.214-.032l.005.001c-4.929-1.689-8.409-6.283-8.409-11.69 0-2.268.612-4.393 1.681-6.219l-.032.058c1.094-1.871 2.609-3.386 4.422-4.449l.058-.031c1.739-1.034 3.835-1.645 6.073-1.645h.098-.005zm-7.64 17.666q.048-.112-.112-.192-.16-.048-.208.032-.048.112.112.192.144.096.208-.032zm.497.545q.112-.08-.032-.256-.16-.144-.256-.048-.112.08.032.256.159.157.256.047zm.48.72q.144-.112 0-.304-.128-.208-.272-.096-.144.08 0 .288t.272.112zm.672.673q.128-.128-.064-.304-.192-.192-.32-.048-.144.128.064.304.192.192.32.044zm.913.4q.048-.176-.208-.256-.24-.064-.304.112t.208.24q.24.097.304-.096zm1.009.08q0-.208-.272-.176-.256 0-.256.176 0 .208.272.176.256.001.256-.175zm.929-.16q-.032-.176-.288-.144-.256.048-.224.24t.288.128.225-.224z\"/></svg>", BrandColor = "#000000", Order = 0, IsActive = true }
        );

        modelBuilder.Entity<Business>()
            .Property(b => b.Type)
            .HasConversion(
                v => v.ToString(),
                v => (BusinessType)Enum.Parse(typeof(BusinessType), v));
                
        // Add some seed data to make testing easier
        modelBuilder.Entity<Business>().HasData(
            new Business { Id = 1, Name = "Vogue Kuafor", Subdomain = "kuafor", Type = BusinessType.Kuafor },
            new Business { Id = 2, Name = "Espresso Kafe", Subdomain = "kafe", Type = BusinessType.Kafe },
            new Business { Id = 3, Name = "Tech Store", Subdomain = "ecommerce", Type = BusinessType.Ecommerce },
            new Business { Id = 4, Name = "Marmaris Sky Resort", Subdomain = "reservasyon", Type = BusinessType.Hotel }
        );

        modelBuilder.Entity<Product>().HasData(
            // Kafe Products
            new Product { Id = 1, BusinessId = 2, Name = "Latte", Description = "Creamy latte", Price = 80, ImageUrl = "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1037&auto=format&fit=crop" },
            new Product { Id = 2, BusinessId = 2, Name = "Mocha", Description = "Chocolate coffee", Price = 95, ImageUrl = "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?q=80&w=1014&auto=format&fit=crop" },
            
            // Ecommerce Products
            new Product { Id = 3, BusinessId = 3, Name = "Mechanical Keyboard", Description = "RGB Keyboard", Price = 1500, ImageUrl = "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=1171&auto=format&fit=crop" }
        );

        modelBuilder.Entity<Service>().HasData(
            new Service { Id = 1, BusinessId = 1, Name = "Saç Kesimi", DurationMinutes = 30, Price = 250 },
            new Service { Id = 2, BusinessId = 1, Name = "Fön", DurationMinutes = 20, Price = 100 },
            new Service { Id = 3, BusinessId = 4, Name = "Standart Oda", DurationMinutes = 1440, Price = 1500 },
            new Service { Id = 4, BusinessId = 4, Name = "Kral Süit", DurationMinutes = 1440, Price = 4500 }
        );

        modelBuilder.Entity<AdminUser>().HasData(
            new AdminUser 
            { 
                Id = 1, 
                Username = "admin", 
                // SHA256 hash of obDs9gP4F9@
                PasswordHash = "905467BFFB1C7089C8AD917EDF98DAAD87191171EFDC6F60229794C182CA48F6" 
            }
        );

        modelBuilder.Entity<SiteContent>().HasData(
            new SiteContent 
            { 
                Id = 1, 
                SectionName = "AboutMe", 
                Title = "Estetik ve performans, ayrıntılarda gizlidir.", 
                Content = "Amacım, markanızı dijital dünyada en şık ve güçlü şekilde temsil etmektir. Yalnızca iyi görünmekle kalmayan, aynı zamanda müşterilerinize pürüzsüz bir deneyim sunan projeler üretiyorum.",
                ImageUrl = "/uploads/7d60de04-9524-47ec-a2a5-324582690b0f.webp"
            },
            new SiteContent 
            { 
                Id = 2, 
                SectionName = "ContactInfo", 
                Title = "iletisim@volkanb.com", 
                Content = "905555555555" 
            },
            new SiteContent 
            { 
                Id = 3, 
                SectionName = "SocialLinks", 
                Title = "https://linkedin.com", 
                Content = "https://github.com",
                ImageUrl = "https://twitter.com"
            },
            new SiteContent 
            { 
                Id = 4, 
                SectionName = "CVFile", 
                Title = "CV", 
                Content = "/uploads/7ef1c743-f3ad-4662-a3b3-afbf1891b6c7.pdf"
            }
        );

        modelBuilder.Entity<DemoProject>().HasData(
            new DemoProject 
            { 
                Id = 1, 
                Title = "Kuaför & Salon Yönetimi", 
                Description = "Güzellik merkezleri için premium randevu ve vitrin sistemi.", 
                Link = "https://kuafor.volkanb.com", 
                ImageUrl = "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800" 
            },
            new DemoProject 
            { 
                Id = 2, 
                Title = "Restoran & Kafe Dijital Menü", 
                Description = "QR menü ve rezervasyon odaklı lüks restoran deneyimi.", 
                Link = "https://kafe.volkanb.com", 
                ImageUrl = "https://images.unsplash.com/photo-1550966841-3ee212df880a?q=80&w=600" 
            },
            new DemoProject 
            { 
                Id = 3, 
                Title = "Saint Archive | Luxury E-Commerce", 
                Description = "Yüksek dönüşüm odaklı butik alışveriş altyapısı ve özel tasarım.", 
                Link = "https://saintarchive.com.tr/", 
                ImageUrl = "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=600" 
            },
            new DemoProject 
            { 
                Id = 4, 
                Title = "ReserveLink | Hibrit Rezervasyon", 
                Description = "Modern otel ve hizmet odaklı hibrit rezervasyon yönetim platformu.", 
                Link = "https://res.volkanb.com", 
                ImageUrl = "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800"
            }
        );

        modelBuilder.Entity<BlogPost>().HasData(
            new BlogPost 
            { 
                Id = 1, 
                Title = "Yeni Portfolyo Yayında", 
                Summary = "Tasarım süreçlerimi ve teknolojiyi nasıl harmanladığım hakkında ufak bir günlük.",
                Content = "Uzun zamandır üzerinde çalıştığım yeni nesil tasarım altyapım nihayet tamamlandı. İşletmeler kendilerine özel sistemleri kusursuz bir performansla kullanabiliyorlar.",
                ImageUrl = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200",
                CreatedAt = DateTime.UtcNow.AddDays(-2)
            }
        );

        modelBuilder.Entity<PortfolioService>().HasData(
            new PortfolioService { Id = 1, Title = "SEO HİZMETİ", Description = "Arama motorlarında görünürlüğünüzü artırın ve daha fazla müşteriye ulaşın.", Icon = "search_insights" },
            new PortfolioService { Id = 2, Title = "WEB SİTESİ HİZMETİ", Description = "Modern, hızlı ve dönüşüm odaklı web siteleri tasarlıyoruz.", Icon = "web" },
            new PortfolioService { Id = 3, Title = "MOBİL UYGULAMA HİZMETİ", Description = "iOS ve Android platformları için yüksek performanslı mobil çözümler.", Icon = "smartphone" },
            new PortfolioService { Id = 4, Title = "OTOMASYON HİZMETİ", Description = "İş süreçlerinizi optimize edin ve verimliliğinizi artırın.", Icon = "robot" }
        );
    }
}
