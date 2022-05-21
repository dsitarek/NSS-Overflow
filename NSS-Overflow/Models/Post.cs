using System.ComponentModel.DataAnnotations;

namespace NSS_Overflow.Models
{
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
        public int? PostReplyId { get; set; }
        [Required]
        public int ThreadId { get; set; }
        public QuestionThread Thread { get; set; }
        public ICollection<Post> PostReplies { get; set; }
        public ICollection<Tag> Tags { get; set; }
    }
}
