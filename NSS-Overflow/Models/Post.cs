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
        [Required]
        [GraphQLDescription("The ID of the parent thread")]
        public int ThreadId { get; set; }
        public QuestionThread Thread { get; set; }
        [GraphQLDescription("A list of replies to the post")]
        public ICollection<PostReply> PostReplies { get; set; } = new List<PostReply>();
    }
}
