﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using NSS_Overflow.Data;

#nullable disable

namespace NSS_Overflow.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20220604180457_addedSeperatePostReplies")]
    partial class addedSeperatePostReplies
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("NSS_Overflow.Models.Post", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<DateTime>("DatePosted")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("LastEdited")
                        .HasColumnType("datetime2");

                    b.Property<string>("PostBody")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ThreadId")
                        .HasColumnType("int");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("ThreadId");

                    b.HasIndex("UserId");

                    b.ToTable("Posts");
                });

            modelBuilder.Entity("NSS_Overflow.Models.PostReply", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<DateTime>("DatePosted")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("LastEdited")
                        .HasColumnType("datetime2");

                    b.Property<string>("PostBody")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PostReplyId")
                        .HasColumnType("int");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("PostReplyId");

                    b.HasIndex("UserId");

                    b.ToTable("PostReplies");
                });

            modelBuilder.Entity("NSS_Overflow.Models.QuestionThread", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<DateTime>("DatePosted")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("LastEdited")
                        .HasColumnType("datetime2");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Threads");
                });

            modelBuilder.Entity("NSS_Overflow.Models.Tag", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("TagDescription")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TagTitle")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Tags");
                });

            modelBuilder.Entity("NSS_Overflow.Models.ThreadTag", b =>
                {
                    b.Property<int>("ThreadId")
                        .HasColumnType("int");

                    b.Property<int>("TagId")
                        .HasColumnType("int");

                    b.HasKey("ThreadId", "TagId");

                    b.HasIndex("TagId");

                    b.ToTable("ThreadTags");
                });

            modelBuilder.Entity("NSS_Overflow.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Avatar")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("NSS_Overflow.Models.Post", b =>
                {
                    b.HasOne("NSS_Overflow.Models.QuestionThread", "Thread")
                        .WithMany("Posts")
                        .HasForeignKey("ThreadId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("NSS_Overflow.Models.User", "User")
                        .WithMany("Posts")
                        .HasForeignKey("UserId")
                        .HasPrincipalKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Thread");

                    b.Navigation("User");
                });

            modelBuilder.Entity("NSS_Overflow.Models.PostReply", b =>
                {
                    b.HasOne("NSS_Overflow.Models.Post", "Post")
                        .WithMany("PostReplies")
                        .HasForeignKey("PostReplyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("NSS_Overflow.Models.User", "User")
                        .WithMany("PostReplies")
                        .HasForeignKey("UserId")
                        .HasPrincipalKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Post");

                    b.Navigation("User");
                });

            modelBuilder.Entity("NSS_Overflow.Models.QuestionThread", b =>
                {
                    b.HasOne("NSS_Overflow.Models.User", "User")
                        .WithMany("Threads")
                        .HasForeignKey("UserId")
                        .HasPrincipalKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("NSS_Overflow.Models.ThreadTag", b =>
                {
                    b.HasOne("NSS_Overflow.Models.Tag", "Tag")
                        .WithMany("ThreadTags")
                        .HasForeignKey("TagId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("NSS_Overflow.Models.QuestionThread", "Thread")
                        .WithMany("ThreadTags")
                        .HasForeignKey("ThreadId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Tag");

                    b.Navigation("Thread");
                });

            modelBuilder.Entity("NSS_Overflow.Models.Post", b =>
                {
                    b.Navigation("PostReplies");
                });

            modelBuilder.Entity("NSS_Overflow.Models.QuestionThread", b =>
                {
                    b.Navigation("Posts");

                    b.Navigation("ThreadTags");
                });

            modelBuilder.Entity("NSS_Overflow.Models.Tag", b =>
                {
                    b.Navigation("ThreadTags");
                });

            modelBuilder.Entity("NSS_Overflow.Models.User", b =>
                {
                    b.Navigation("PostReplies");

                    b.Navigation("Posts");

                    b.Navigation("Threads");
                });
#pragma warning restore 612, 618
        }
    }
}
