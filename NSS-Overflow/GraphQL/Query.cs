using NSS_Overflow.Data;
using NSS_Overflow.Models;
using HotChocolate;

namespace NSS_Overflow.GraphQL
{
    public class Query
    {
        [UseDbContext(typeof(AppDbContext))]
        [UsePaging]
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        public IQueryable<QuestionThread> GetThread([ScopedService] AppDbContext context)
        {
            return context.Threads;
        }
        [UseDbContext(typeof(AppDbContext))]
        [UseProjection]
        [UseSorting]
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

        [UseDbContext(typeof(AppDbContext))]
        [UseProjection]
        [UseFiltering]
        public IQueryable<ThreadTag> GetThreadTags([ScopedService] AppDbContext context)
        {
            return context.ThreadTags;
        }
        [UseDbContext(typeof(AppDbContext))]
        [UseProjection]
        public IQueryable<ThreadTag> GetThreadsByTag([ScopedService] AppDbContext context, string tag)
        {
            var threads = context.ThreadTags.Where(t => t.Tag.TagTitle == tag);
            return threads;
        }

        [UseDbContext(typeof(AppDbContext))]
        [UseProjection]
        [UseSorting]
        public IQueryable<QuestionThread> GetSingleThread([ScopedService] AppDbContext context, int threadId)
        {
            var thread = context.Threads.Where(t => t.Id == threadId);
            return thread;
        }

        [UseDbContext(typeof(AppDbContext))]
        [UseProjection]
        [UseSorting]
        public IQueryable<QuestionThread> GetSearchThread([ScopedService] AppDbContext context, string search)
        {
            var threads = context.Threads.Where(t => t.Title.Contains(search));
            return threads;
        }
    }
}
