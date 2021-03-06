using System.ComponentModel.DataAnnotations;

namespace NSS_Overflow.Models
{
    [GraphQLDescription("Represents a Question thread created by a user")]
    public class QuestionThread
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public DateTime DatePosted { get; set; }
        public DateTime? LastEdited { get; set; }
        [Required]
        [GraphQLIgnore]
        public string UserId { get; set; }
        public User User { get; set; }
        public ICollection<Post> Posts { get; set; } = new List<Post>();
        public ICollection<ThreadTag> ThreadTags { get; set;}
        public int AnswerCount => Posts.AsEnumerable().Count();
        public int? ThreadKarma => Posts.AsEnumerable().FirstOrDefault()?.PostVoteTotal ?? 0;
    }
}
