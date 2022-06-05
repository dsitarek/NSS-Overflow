using System.ComponentModel.DataAnnotations;

namespace NSS_Overflow.Models
{
    public class NewThread
    {
        [Required]
        public string Title { get; set; }
        [Required]
        public DateTime DatePosted { get; set; }
        [Required]
        public string PostBody { get; set; }
        public int ThreadId { get; set; }
        public List<int> TagIdList { get; set; }
    }
}
