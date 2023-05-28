using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class TipPackageRelationshipMany : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tips_Packages_PackageId",
                table: "Tips");

            migrationBuilder.DropIndex(
                name: "IX_Tips_PackageId",
                table: "Tips");

            migrationBuilder.DropColumn(
                name: "PackageId",
                table: "Tips");

            migrationBuilder.CreateTable(
                name: "PackageTip",
                columns: table => new
                {
                    PackagesId = table.Column<int>(type: "INTEGER", nullable: false),
                    TipsId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PackageTip", x => new { x.PackagesId, x.TipsId });
                    table.ForeignKey(
                        name: "FK_PackageTip_Packages_PackagesId",
                        column: x => x.PackagesId,
                        principalTable: "Packages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PackageTip_Tips_TipsId",
                        column: x => x.TipsId,
                        principalTable: "Tips",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PackageTip_TipsId",
                table: "PackageTip",
                column: "TipsId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PackageTip");

            migrationBuilder.AddColumn<int>(
                name: "PackageId",
                table: "Tips",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Tips_PackageId",
                table: "Tips",
                column: "PackageId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tips_Packages_PackageId",
                table: "Tips",
                column: "PackageId",
                principalTable: "Packages",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
