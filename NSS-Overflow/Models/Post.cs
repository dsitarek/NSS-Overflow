using System.ComponentModel.DataAnnotations;

namespace NSS_Overflow.Models
{
    [GraphQLDescription("Represents a child of a thread or a reply to a child of a thread")]
    public class Post
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string PostBody { get; set; }
        [Required]
        public DateTime DatePosted { get; set; }
        public DateTime? LastEdited { get; set; }
        [Required]
        public string UserId { get; set; }
        public User User { get; set; }
        [GraphQLDescription("The ID of the parent post if this post is the child of another post")]
        public int? PostReplyId { get; set; }
        [Required]
        [GraphQLDescription("The ID of the parent thread")]
        public int ThreadId { get; set; }
        public QuestionThread Thread { get; set; }
        public ICollection<Post> PostReplies { get; set; }
        public ICollection<Tag> Tags { get; set; }
    }
}
