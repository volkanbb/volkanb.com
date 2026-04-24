using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace SaaS.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddDemoProjectsAndSettings : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AdminUsers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Username = table.Column<string>(type: "text", nullable: false),
                    PasswordHash = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdminUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BlogPosts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Summary = table.Column<string>(type: "text", nullable: false),
                    Content = table.Column<string>(type: "text", nullable: false),
                    ImageUrl = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BlogPosts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Businesses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Subdomain = table.Column<string>(type: "text", nullable: false),
                    Type = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Businesses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DemoProjects",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    ImageUrl = table.Column<string>(type: "text", nullable: false),
                    Link = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DemoProjects", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SiteContents",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    SectionName = table.Column<string>(type: "text", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Content = table.Column<string>(type: "text", nullable: false),
                    ImageUrl = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SiteContents", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Appointments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BusinessId = table.Column<int>(type: "integer", nullable: false),
                    CustomerName = table.Column<string>(type: "text", nullable: false),
                    CustomerPhone = table.Column<string>(type: "text", nullable: false),
                    Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Appointments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Appointments_Businesses_BusinessId",
                        column: x => x.BusinessId,
                        principalTable: "Businesses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BusinessId = table.Column<int>(type: "integer", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    Price = table.Column<decimal>(type: "numeric", nullable: false),
                    ImageUrl = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Products_Businesses_BusinessId",
                        column: x => x.BusinessId,
                        principalTable: "Businesses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Services",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BusinessId = table.Column<int>(type: "integer", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    DurationMinutes = table.Column<int>(type: "integer", nullable: false),
                    Price = table.Column<decimal>(type: "numeric", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Services", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Services_Businesses_BusinessId",
                        column: x => x.BusinessId,
                        principalTable: "Businesses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AdminUsers",
                columns: new[] { "Id", "PasswordHash", "Username" },
                values: new object[] { 1, "905467BFFB1C7089C8AD917EDF98DAAD87191171EFDC6F60229794C182CA48F6", "admin" });

            migrationBuilder.InsertData(
                table: "BlogPosts",
                columns: new[] { "Id", "Content", "CreatedAt", "ImageUrl", "Summary", "Title" },
                values: new object[] { 1, "Uzun zamandır üzerinde çalıştığım yeni nesil tasarım altyapım nihayet tamamlandı. İşletmeler kendilerine özel sistemleri kusursuz bir performansla kullanabiliyorlar.", new DateTime(2026, 4, 6, 3, 19, 57, 489, DateTimeKind.Utc).AddTicks(6329), null, "Tasarım süreçlerimi ve teknolojiyi nasıl harmanladığım hakkında ufak bir günlük.", "Yeni Portfolyo Yayında" });

            migrationBuilder.InsertData(
                table: "Businesses",
                columns: new[] { "Id", "Name", "Subdomain", "Type" },
                values: new object[,]
                {
                    { 1, "Vogue Kuafor", "kuafor", "Kuafor" },
                    { 2, "Espresso Kafe", "kafe", "Kafe" },
                    { 3, "Tech Store", "ecommerce", "Ecommerce" }
                });

            migrationBuilder.InsertData(
                table: "DemoProjects",
                columns: new[] { "Id", "Description", "ImageUrl", "Link", "Title" },
                values: new object[,]
                {
                    { 1, "Online randevu sistemi ve dijital asistan.", "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=800", "http://kuafor.localhost", "Kuaför & Güzellik" },
                    { 2, "QR destekli masa siparişi ve dijital menü.", "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=600", "http://kafe.localhost", "Kafe & Restoran" },
                    { 3, "Modern sepet ve gelişmiş ödeme sistemleri.", "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=600", "http://ecommerce.localhost", "E-Ticaret Altyapısı" }
                });

            migrationBuilder.InsertData(
                table: "SiteContents",
                columns: new[] { "Id", "Content", "ImageUrl", "SectionName", "Title" },
                values: new object[,]
                {
                    { 1, "Amacım, markanızı dijital dünyada en şık ve güçlü şekilde temsil etmektir. Yalnızca iyi görünmekle kalmayan, aynı zamanda müşterilerinize pürüzsüz bir deneyim sunan projeler üretiyorum.", null, "AboutMe", "Estetik ve performans, ayrıntılarda gizlidir." },
                    { 2, "905555555555", null, "ContactInfo", "iletisim@portfolyopro.com" },
                    { 3, "https://github.com", "https://twitter.com", "SocialLinks", "https://linkedin.com" }
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "BusinessId", "Description", "ImageUrl", "Name", "Price" },
                values: new object[,]
                {
                    { 1, 2, "Creamy latte", "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1037&auto=format&fit=crop", "Latte", 80m },
                    { 2, 2, "Chocolate coffee", "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?q=80&w=1014&auto=format&fit=crop", "Mocha", 95m },
                    { 3, 3, "RGB Keyboard", "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=1171&auto=format&fit=crop", "Mechanical Keyboard", 1500m }
                });

            migrationBuilder.InsertData(
                table: "Services",
                columns: new[] { "Id", "BusinessId", "DurationMinutes", "Name", "Price" },
                values: new object[,]
                {
                    { 1, 1, 30, "Saç Kesimi", 250m },
                    { 2, 1, 20, "Fön", 100m }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Appointments_BusinessId",
                table: "Appointments",
                column: "BusinessId");

            migrationBuilder.CreateIndex(
                name: "IX_Products_BusinessId",
                table: "Products",
                column: "BusinessId");

            migrationBuilder.CreateIndex(
                name: "IX_Services_BusinessId",
                table: "Services",
                column: "BusinessId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AdminUsers");

            migrationBuilder.DropTable(
                name: "Appointments");

            migrationBuilder.DropTable(
                name: "BlogPosts");

            migrationBuilder.DropTable(
                name: "DemoProjects");

            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "Services");

            migrationBuilder.DropTable(
                name: "SiteContents");

            migrationBuilder.DropTable(
                name: "Businesses");
        }
    }
}
