using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SaaS.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdateReserveLinkExternalURL : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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
                keyValue: 4,
                column: "Link",
                value: "http://localhost:5001");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "BlogPosts",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2026, 4, 16, 15, 27, 52, 97, DateTimeKind.Utc).AddTicks(452));

            migrationBuilder.UpdateData(
                table: "DemoProjects",
                keyColumn: "Id",
                keyValue: 4,
                column: "Link",
                value: "/reservasyon");
        }
    }
}
