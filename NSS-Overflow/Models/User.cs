using System.ComponentModel.DataAnnotations;

namespace NSS_Overflow.Models

{
    [GraphQLDescription("Represents a application user")]
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [GraphQLIgnore]
        public string UserId { get; set; }
        [Required]
        public string Username { get; set; }
        [GraphQLDescription("A link to an image supplied by the users Google profile")]
        public string? Avatar { get; set; }
        public ICollection<QuestionThread> Threads { get; set; }
        public ICollection<Post> Posts { get; set; }

    }
}
