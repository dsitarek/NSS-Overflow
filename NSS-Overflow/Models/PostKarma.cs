namespace NSS_Overflow.Models
{
    public class PostKarma
    {
        public int? Id { get; set; }
        [GraphQLIgnore]
        public string? UserId { get; set; }
        public int PostId { get; set; }
        public int? Vote { get; set; }
        public Post? Post { get; set; }
        public string? PostUsername { get; set; }
    }
}
