using NSS_Overflow.Data;
using NSS_Overflow.Models;
using HotChocolate;

namespace NSS_Overflow.GraphQL
{
    public class Query
    {
        [UseDbContext(typeof(AppDbContext))]
        [UseProjection]
        [UseFiltering]
        public IQueryable<QuestionThread> GetThread([ScopedService] AppDbContext context)
        {
            return context.Threads;
        }
        [UseDbContext(typeof(AppDbContext))]
        [UseProjection]
        public IQueryable<Post> GetPost([ScopedService] AppDbContext context)
        {
            return context.Posts;
        }
        [UseDbContext(typeof(AppDbContext))]
        public IQueryable<Tag> GetTag([ScopedService] AppDbContext context)
        {
            return context.Tags;
        }
        [UseDbContext(typeof(AppDbContext))]
        public IQueryable<User> GetUser([ScopedService] AppDbContext context)
        {
            return context.Users;
        }

    }
}
