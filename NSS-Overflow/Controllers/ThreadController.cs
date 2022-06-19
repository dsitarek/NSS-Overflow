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
        [Authorize]
        [HttpPost("Create")]
        public async Task<IActionResult> PostThread([FromHeader] string idToken, [FromBody] NewThread thread)
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

        [Authorize]
        [HttpPost("AddComment")]
        public async Task<IActionResult> PostComment([FromHeader] string idToken, [FromBody] NewComment reply)
        {
            FirebaseToken decoded = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(idToken);
            var uid = decoded.Uid;

            PostReply newReply = new PostReply()
            {
                PostBody = reply.PostBody,
                DatePosted = DateTime.Now,
                UserId = uid,
                PostReplyId = reply.PostReplyId
            };

            _dbContext.PostReplies.Add(newReply);

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok();
        }

        [Authorize]
        [HttpPost("AddPost")]
        public async Task<IActionResult> AddPost([FromHeader] string idToken, [FromBody] NewPost post)
        {
            FirebaseToken decoded = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(idToken);
            var uid = decoded.Uid;

            Post newPost = new Post()
            {
                PostBody = post.PostBody,
                DatePosted = DateTime.Now,
                UserId = uid,
                ThreadId = post.ThreadId,
            };

            _dbContext.Posts.Add(newPost);

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok();
        }

        [Authorize]
        [HttpPost("votePost")]
        public async Task<IActionResult> VotePost([FromHeader] string idToken, [FromBody] PostKarma vote)
        {
            FirebaseToken decoded = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(idToken);
            var uid = decoded.Uid;
            var voteExists = _dbContext.PostKarma.FirstOrDefault(p => p.UserId == uid && p.PostId == vote.PostId);
            string postUserId = _dbContext.Posts?.FirstOrDefault(p => p.Id == vote.PostId).UserId;
            string postUserName = _dbContext.Users.FirstOrDefault(u => u.UserId == postUserId).Username;

            if(postUserId == uid)
            { 
                return Ok("Cannot vote on your own post"); 
            }

            if (voteExists == null)
            {
                PostKarma newVote = new PostKarma()
                {
                    UserId = uid,
                    PostId = vote.PostId,
                    Vote = vote.Vote,
                    PostUsername = postUserName,
                };

                _dbContext.PostKarma.Add(newVote);
            }

            if (voteExists != null)
            {
                int? voteT = voteExists.Vote + vote.Vote;
                voteExists.Vote = voteT == 0 ? 0 : voteT > 0 ? 1 : -1;

            }

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok();
        }
    }
}