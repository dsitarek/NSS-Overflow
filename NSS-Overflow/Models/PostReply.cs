using System.ComponentModel.DataAnnotations;

namespace NSS_Overflow.Models
{
    public class PostReply
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
        [GraphQLDescription("The ID of the parent post")]
        public int PostReplyId { get; set; }
        public Post Post { get; set; }
    }
}
