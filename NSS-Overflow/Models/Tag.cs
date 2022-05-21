using System.ComponentModel.DataAnnotations;
namespace NSS_Overflow.Models
{
    public class Tag
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string TagTitle { get; set; }
        public string? TagDescription { get; set; }
        public ICollection<Post> Posts { get; set; }
    }
}
