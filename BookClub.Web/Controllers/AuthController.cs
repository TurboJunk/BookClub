using BookClub.Resource;
using BookClub.Resource.Models;
using BookClub.Web.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace BookClub.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IOptions<AuthOptions> authOptions;
        private readonly DataContext db;

        public AuthController(IOptions<AuthOptions> authOptions, DataContext db)
        {
            this.authOptions = authOptions;
            this.db = db;
        }

        [Route("login")]
        [HttpPost]
        public IActionResult Login([FromBody] Login request)
        {
            var user = AuthenticateUser(request.Name, request.Password);

            if (user != null)
            {
                var token = GenerateJWT(user);
                return Ok(new
                {
                    access_token = token
                });
            }

            return Unauthorized();
        }

        private User AuthenticateUser(string name, string password)
        {
            return db.Users.SingleOrDefault(u => u.Name == name && u.Password == password);
        }

        private string GenerateJWT(User user)
        {
            var authParams = authOptions.Value;
            var securityKey = authParams.GetSymmetricSecurityKey();
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>()
            {
                new Claim(JwtRegisteredClaimNames.UniqueName, user.Name),
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString())
            };

            var token = new JwtSecurityToken(authParams.Issuer,
                authParams.Audience,
                claims,
                expires: DateTime.Now.AddSeconds(authParams.TokenLifetime),
                signingCredentials: credentials);
            return new JwtSecurityTokenHandler().WriteToken(token);

        }

        [Route("register")]
        [HttpPost]
        public IActionResult Register([FromBody] Register request)
        {
            if (db.Users.Any(u => u.Name == request.Name))
                return Conflict("This user already exists");
            db.Users.Add(new User(request.Name, request.Password));
            db.SaveChanges();
            return Ok();
        }
    }
}
