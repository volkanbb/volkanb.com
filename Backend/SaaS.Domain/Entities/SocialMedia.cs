using System;

namespace SaaS.Domain.Entities
{
    public class SocialMedia
    {
        public int Id { get; set; }
        public string PlatformName { get; set; } // YouTube, Kick, Instagram, vb.
        public string Url { get; set; }
        public string IconSvg { get; set; } // Orijinal marka logosu için SVG kodu
        public string BrandColor { get; set; } // #FF0000, #53fc18 vb. (Glow efekti için)
        public int Order { get; set; } // Sıralama için
        public bool IsActive { get; set; } = true;
    }
}
