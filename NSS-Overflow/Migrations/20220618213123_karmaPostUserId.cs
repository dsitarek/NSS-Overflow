using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NSS_Overflow.Migrations
{
    public partial class karmaPostUserId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PostUserId",
                table: "PostKarma",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PostUserId",
                table: "PostKarma");
        }
    }
}
