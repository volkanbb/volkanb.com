using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace SaaS.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddPortfolioVideos : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PortfolioVideos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "text", nullable: false),
                    YoutubeUrl = table.Column<string>(type: "text", nullable: false),
                    IsVertical = table.Column<bool>(type: "boolean", nullable: false),
                    Order = table.Column<int>(type: "integer", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PortfolioVideos", x => x.Id);
                });

            migrationBuilder.UpdateData(
                table: "BlogPosts",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2026, 5, 4, 21, 56, 19, 627, DateTimeKind.Utc).AddTicks(6210));

            migrationBuilder.InsertData(
                table: "PortfolioVideos",
                columns: new[] { "Id", "CreatedAt", "IsActive", "IsVertical", "Order", "Title", "YoutubeUrl" },
                values: new object[,]
                {
                    { 1, new DateTime(2026, 5, 6, 21, 56, 19, 627, DateTimeKind.Utc).AddTicks(6274), true, true, 1, "Örnek Dikey Video", "https://www.youtube.com/shorts/3O7zR1ZpEaw" },
                    { 2, new DateTime(2026, 5, 6, 21, 56, 19, 627, DateTimeKind.Utc).AddTicks(6276), true, false, 2, "Örnek Yatay Video", "https://www.youtube.com/watch?v=dQw4w9WgXcQ" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PortfolioVideos");

            migrationBuilder.UpdateData(
                table: "BlogPosts",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2026, 4, 30, 17, 48, 37, 565, DateTimeKind.Utc).AddTicks(3844));
        }
    }
}
