using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NSS_Overflow.Migrations
{
    public partial class karmaPostUserName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PostUserId",
                table: "PostKarma",
                newName: "PostUsername");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PostUsername",
                table: "PostKarma",
                newName: "PostUserId");
        }
    }
}
