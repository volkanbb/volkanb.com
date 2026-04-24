using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SaaS.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdateSeedDataUrls : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "BlogPosts",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2026, 4, 22, 13, 39, 36, 145, DateTimeKind.Utc).AddTicks(1676));

            migrationBuilder.UpdateData(
                table: "DemoProjects",
                keyColumn: "Id",
                keyValue: 1,
                column: "Link",
                value: "https://kuafor.volkanb.com");

            migrationBuilder.UpdateData(
                table: "DemoProjects",
                keyColumn: "Id",
                keyValue: 2,
                column: "Link",
                value: "https://kafe.volkanb.com");

            migrationBuilder.UpdateData(
                table: "DemoProjects",
                keyColumn: "Id",
                keyValue: 4,
                column: "Link",
                value: "https://res.volkanb.com");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "BlogPosts",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2026, 4, 16, 15, 35, 7, 6, DateTimeKind.Utc).AddTicks(54));

            migrationBuilder.UpdateData(
                table: "DemoProjects",
                keyColumn: "Id",
                keyValue: 1,
                column: "Link",
                value: "http://kuafor.localhost");

            migrationBuilder.UpdateData(
                table: "DemoProjects",
                keyColumn: "Id",
                keyValue: 2,
                column: "Link",
                value: "http://kafe.localhost");

            migrationBuilder.UpdateData(
                table: "DemoProjects",
                keyColumn: "Id",
                keyValue: 4,
                column: "Link",
                value: "http://localhost:5001");
        }
    }
}
