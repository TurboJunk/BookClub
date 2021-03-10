using BookClub.Resource;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookClub.Web.Controllers
{
    [Route("")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly DataContext db;

        public HomeController(DataContext db)
        {
            this.db = db;
        }
        [HttpGet]
        public IActionResult GetBooks()
        {
            return Ok(db.Books);
        }
    }
}
