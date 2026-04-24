using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SaaS.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class FixLocalDemoPorts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "BlogPosts",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2026, 4, 10, 7, 27, 48, 838, DateTimeKind.Utc).AddTicks(2727));

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
                value: "http://crm.localhost");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "BlogPosts",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2026, 4, 10, 7, 12, 51, 503, DateTimeKind.Utc).AddTicks(9160));

            migrationBuilder.UpdateData(
                table: "DemoProjects",
                keyColumn: "Id",
                keyValue: 1,
                column: "Link",
                value: "http://kuafor.localhost:4200");

            migrationBuilder.UpdateData(
                table: "DemoProjects",
                keyColumn: "Id",
                keyValue: 2,
                column: "Link",
                value: "http://kafe.localhost:4200");

            migrationBuilder.UpdateData(
                table: "DemoProjects",
                keyColumn: "Id",
                keyValue: 4,
                column: "Link",
                value: "http://crm.localhost:4200");
        }
    }
}
