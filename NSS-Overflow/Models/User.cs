using System.ComponentModel.DataAnnotations;

namespace NSS_Overflow.Models

{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string UserId { get; set; }
        [Required]
        public string Username { get; set; }
        public string? Avatar { get; set; }
        public ICollection<QuestionThread> Threads { get; set; }
        public ICollection<Post> Posts { get; set; }

    }
}
