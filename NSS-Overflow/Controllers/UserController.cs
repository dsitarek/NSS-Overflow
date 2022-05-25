using FirebaseAdmin.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSS_Overflow.Data;
using NSS_Overflow.Models;
using NSS_Overflow.Repos;

namespace NSS_Overflow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        //TODO: fix AppDbContext injection
        private readonly AppDbContext _dbContext;
        public UserController([ScopedService]AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult get()
        {
            return Ok(1);
        }

        [Authorize]
        [HttpGet("Auth")]
        public async Task<IActionResult> PostAsync([FromHeader] string idToken)
        {
            FirebaseToken decoded = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(idToken);
            var uid = decoded.Uid;
            bool customerExists = _dbContext.Users.FirstOrDefault(x => x.UserId == uid).UserId == uid;
            if (!customerExists)
            {
                User userFromToken = new User()
                {
                    UserId = uid,
                    Username = decoded.Claims.GetValueOrDefault("email").ToString().Split('@')[0],
                    Avatar = (string)decoded.Claims.GetValueOrDefault("picture"),
                };

                _dbContext.Users.Add(userFromToken);
                try
                {
                    await _dbContext.SaveChangesAsync();
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }

                return Ok($"Customer Created");

            }
            return Ok("Customer Exists");

        }
    }
}
