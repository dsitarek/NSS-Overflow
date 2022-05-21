using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NSS_Overflow.Migrations
{
    public partial class AddRelats : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Posts_ThreadId",
                table: "Posts",
                column: "ThreadId");

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_Threads_ThreadId",
                table: "Posts",
                column: "ThreadId",
                principalTable: "Threads",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Posts_Threads_ThreadId",
                table: "Posts");

            migrationBuilder.DropIndex(
                name: "IX_Posts_ThreadId",
                table: "Posts");
        }
    }
}
