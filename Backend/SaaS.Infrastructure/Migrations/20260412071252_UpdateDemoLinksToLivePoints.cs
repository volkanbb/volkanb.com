using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SaaS.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDemoLinksToLivePoints : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "BlogPosts",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "ImageUrl" },
                values: new object[] { new DateTime(2026, 4, 10, 7, 12, 51, 503, DateTimeKind.Utc).AddTicks(9160), "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200" });

            migrationBuilder.UpdateData(
                table: "DemoProjects",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Description", "ImageUrl", "Link", "Title" },
                values: new object[] { "Güzellik merkezleri için premium randevu ve vitrin sistemi.", "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800", "http://kuafor.localhost:4200", "Kuaför & Salon Yönetimi" });

            migrationBuilder.UpdateData(
                table: "DemoProjects",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Description", "ImageUrl", "Link", "Title" },
                values: new object[] { "QR menü ve rezervasyon odaklı lüks restoran deneyimi.", "https://images.unsplash.com/photo-1550966841-3ee212df880a?q=80&w=600", "http://kafe.localhost:4200", "Restoran & Kafe Dijital Menü" });

            migrationBuilder.UpdateData(
                table: "DemoProjects",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Description", "ImageUrl", "Link", "Title" },
                values: new object[] { "Yüksek dönüşüm odaklı butik alışveriş altyapısı ve özel tasarım.", "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=600", "https://saintarchive.com.tr/", "Saint Archive | Luxury E-Commerce" });

            migrationBuilder.UpdateData(
                table: "DemoProjects",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Description", "ImageUrl", "Link", "Title" },
                values: new object[] { "İşletme verimliliğini artıran modern SaaS yönetim dashboard'u.", "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600", "http://crm.localhost:4200", "Kurumsal CRM Paneli" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "BlogPosts",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "ImageUrl" },
                values: new object[] { new DateTime(2026, 4, 9, 2, 4, 11, 181, DateTimeKind.Utc).AddTicks(6354), null });

            migrationBuilder.UpdateData(
                table: "DemoProjects",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Description", "ImageUrl", "Link", "Title" },
                values: new object[] { "Online randevu sistemi ve dijital asistan.", "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=800", "http://kuafor.localhost", "Kuaför & Güzellik" });

            migrationBuilder.UpdateData(
                table: "DemoProjects",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Description", "ImageUrl", "Link", "Title" },
                values: new object[] { "QR destekli masa siparişi ve dijital menü.", "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=600", "http://kafe.localhost", "Kafe & Restoran" });

            migrationBuilder.UpdateData(
                table: "DemoProjects",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Description", "ImageUrl", "Link", "Title" },
                values: new object[] { "Modern sepet ve gelişmiş ödeme sistemleri.", "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=600", "http://ecommerce.localhost", "E-Ticaret Altyapısı" });

            migrationBuilder.UpdateData(
                table: "DemoProjects",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Description", "ImageUrl", "Link", "Title" },
                values: new object[] { "İşletmenizi dijitalleştiren akıllı müşteri yönetim ve otomasyon paneli.", "/uploads/8b95a037-a264-467d-9afc-1cca4b7c9881.webp", "#", "CRM Otomasyonv1.1" });
        }
    }
}
