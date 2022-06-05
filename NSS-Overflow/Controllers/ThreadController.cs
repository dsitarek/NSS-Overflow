using FirebaseAdmin.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSS_Overflow.Data;
using NSS_Overflow.Models;

namespace NSS_Overflow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ThreadController : ControllerBase
    {
        private readonly AppDbContext _dbContext;
        public ThreadController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost("Create")]
        public async Task<IActionResult> PostAsync([FromHeader] string idToken, [FromBody] NewThread thread)
        {
            FirebaseToken decoded = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(idToken);
            var uid = decoded.Uid;

            QuestionThread newThread = new QuestionThread()
            {
                UserId = uid,
                Title = thread.Title,
                DatePosted = DateTime.Now,
            };

            _dbContext.Threads.Add(newThread);

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            int newthreadId = newThread.Id;

            thread.TagIdList.ForEach(tagId =>
            {

                _dbContext.ThreadTags.Add(new ThreadTag()
                {
                    ThreadId = newthreadId,
                    TagId = tagId
                });
            });

            Post topPost = new Post()
            {
                PostBody = thread.PostBody,
                DatePosted = DateTime.Now,
                UserId = uid,
                ThreadId = newthreadId
            };

            _dbContext.Posts.Add(topPost);

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok(newthreadId);
        }
    }
}