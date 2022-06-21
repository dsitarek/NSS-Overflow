using Microsoft.EntityFrameworkCore;
using NSS_Overflow.Models;

namespace NSS_Overflow.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<QuestionThread> Threads { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<ThreadTag> ThreadTags { get; set; }
        public DbSet<PostReply> PostReplies { get; set; }
        public DbSet<PostKarma> PostKarma { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<QuestionThread>().HasMany(t => t.Posts).WithOne(p => p.Thread!).HasForeignKey(p => p.ThreadId);
            modelBuilder.Entity<QuestionThread>().HasOne(t => t.User).WithMany(u => u.Threads).HasForeignKey(t => t.UserId).HasPrincipalKey(u => u.UserId);
            modelBuilder.Entity<Post>().HasOne(p => p.Thread).WithMany(t => t.Posts).HasForeignKey(p => p.ThreadId);
            modelBuilder.Entity<Post>().HasOne(t => t.User).WithMany(u => u.Posts).HasForeignKey(t => t.UserId).HasPrincipalKey(u => u.UserId);
            modelBuilder.Entity<Post>().HasMany(t => t.PostReplies).WithOne(p => p.Post).HasForeignKey(p => p.PostReplyId);
            modelBuilder.Entity<Post>().HasMany(t => t.PostKarmaList).WithOne(p => p.Post).HasForeignKey(p => p.PostId);
            modelBuilder.Entity<ThreadTag>().HasKey(tt => new {tt.ThreadId, tt.TagId});
            modelBuilder.Entity<ThreadTag>().HasOne(tt => tt.Tag).WithMany(t => t.ThreadTags).HasForeignKey(tt => tt.TagId);
            modelBuilder.Entity<ThreadTag>().HasOne(tt => tt.Thread).WithMany(t => t.ThreadTags).HasForeignKey(tt => tt.ThreadId);
            modelBuilder.Entity<PostReply>().HasOne(t => t.User).WithMany(u => u.PostReplies).HasForeignKey(t => t.UserId).HasPrincipalKey(u => u.UserId);
        }
    }

}