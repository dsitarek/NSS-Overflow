namespace NSS_Overflow.Models
{
    [GraphQLDescription("Represents a tag belonging to a thread")]
    public class ThreadTag
    {
        public int ThreadId { get; set; }
        public QuestionThread Thread { get; set; }
        public int TagId { get; set; }
        public Tag Tag { get; set; }
    }
}
