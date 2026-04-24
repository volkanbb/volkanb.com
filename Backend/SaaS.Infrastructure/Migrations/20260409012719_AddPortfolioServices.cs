using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace SaaS.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddPortfolioServices : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PortfolioServices",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    Icon = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PortfolioServices", x => x.Id);
                });

            migrationBuilder.UpdateData(
                table: "BlogPosts",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2026, 4, 7, 1, 27, 19, 519, DateTimeKind.Utc).AddTicks(8182));

            migrationBuilder.InsertData(
                table: "PortfolioServices",
                columns: new[] { "Id", "Description", "Icon", "Title" },
                values: new object[,]
                {
                    { 1, "Arama motorlarında görünürlüğünüzü artırın ve daha fazla müşteriye ulaşın.", "search_insights", "SEO HİZMETİ" },
                    { 2, "Modern, hızlı ve dönüşüm odaklı web siteleri tasarlıyoruz.", "web", "WEB SİTESİ HİZMETİ" },
                    { 3, "iOS ve Android platformları için yüksek performanslı mobil çözümler.", "smartphone", "MOBİL UYGULAMA HİZMETİ" },
                    { 4, "İş süreçlerinizi optimize edin ve verimliliğinizi artırın.", "robot", "OTOMASYON HİZMETİ" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PortfolioServices");

            migrationBuilder.UpdateData(
                table: "BlogPosts",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2026, 4, 7, 1, 11, 38, 108, DateTimeKind.Utc).AddTicks(5718));
        }
    }
}
