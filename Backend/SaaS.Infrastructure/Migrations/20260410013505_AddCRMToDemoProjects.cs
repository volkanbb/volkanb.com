using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SaaS.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddCRMToDemoProjects : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "BlogPosts",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2026, 4, 8, 1, 35, 4, 705, DateTimeKind.Utc).AddTicks(2159));

            migrationBuilder.InsertData(
                table: "DemoProjects",
                columns: new[] { "Id", "Description", "ImageUrl", "Link", "Title" },
                values: new object[] { 4, "İşletmenizi dijitalleştiren akıllı müşteri yönetim ve otomasyon paneli.", "https://images.unsplash.com/photo-1551288049-bbdac8a28a1e?q=80&w=800", "#", "CRM Otomasyonv1.1" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "DemoProjects",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.UpdateData(
                table: "BlogPosts",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2026, 4, 7, 1, 27, 19, 519, DateTimeKind.Utc).AddTicks(8182));
        }
    }
}
