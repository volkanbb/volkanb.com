using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace SaaS.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ReplacementCRMWithReserveLink : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "BlogPosts",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2026, 4, 16, 15, 27, 52, 97, DateTimeKind.Utc).AddTicks(452));

            migrationBuilder.InsertData(
                table: "Businesses",
                columns: new[] { "Id", "Name", "Subdomain", "Type" },
                values: new object[] { 4, "Marmaris Sky Resort", "reservasyon", "Hotel" });

            migrationBuilder.UpdateData(
                table: "DemoProjects",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Description", "ImageUrl", "Link", "Title" },
                values: new object[] { "Modern otel ve hizmet odaklı hibrit rezervasyon yönetim platformu.", "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800", "/reservasyon", "ReserveLink | Hibrit Rezervasyon" });

            migrationBuilder.InsertData(
                table: "Services",
                columns: new[] { "Id", "BusinessId", "DurationMinutes", "Name", "Price" },
                values: new object[,]
                {
                    { 3, 4, 1440, "Standart Oda", 1500m },
                    { 4, 4, 1440, "Kral Süit", 4500m }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Services",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Services",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Businesses",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.UpdateData(
                table: "BlogPosts",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2026, 4, 10, 7, 27, 48, 838, DateTimeKind.Utc).AddTicks(2727));

            migrationBuilder.UpdateData(
                table: "DemoProjects",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Description", "ImageUrl", "Link", "Title" },
                values: new object[] { "İşletme verimliliğini artıran modern SaaS yönetim dashboard'u.", "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600", "http://crm.localhost", "Kurumsal CRM Paneli" });
        }
    }
}
