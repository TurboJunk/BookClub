using BookClub.Resource;
using BookClub.Resource.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

namespace BookClub.Web.Controllers
{
    [Route("")]
    [Authorize]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly IConfiguration configuration;
        private readonly DataContext db;

        private Guid userId => Guid.Parse(User.Claims.Single(c => c.Type == ClaimTypes.NameIdentifier).Value);
        private User currentUser => db.Users.Single(u => u.Id == userId);

        public BooksController(IConfiguration configuration, DataContext db)
        {
            this.configuration = configuration;
            this.db = db;
        }

        [HttpGet]
        [Route("booklist")]
        public IActionResult GetBookList()
        {
            var booklist = db.Books.Where(book => book.UserList.Any(user => user.Id == userId)).ToList();
            return Ok(booklist);
        }

        [HttpGet]
        [Route("aviablebooks")]
        public IActionResult GetAviableBooks()
        {
            var books = db.Books.Where(book => !(book.UserList.Any(user => user.Id == userId))).ToList();
            return Ok(books);
        }

        [HttpPost]
        [Route("booklist")]
        public IActionResult DeleteBookFromList(Book book)
        {
            if (ModelState.IsValid)
            {
                db.Books.Include(b => b.UserList).Single(b => b == book).UserList.Remove(currentUser);
                db.SaveChanges();
                return Ok(book);
            }
            return BadRequest(ModelState);
        }

        [HttpPost]
        [Route("aviablebooks")]
        public IActionResult AddToList(Book book)
        {
            if (ModelState.IsValid)
            {
                if (BookListLimit() > 0)
                {
                    currentUser.BookList.Add(book);
                    db.SaveChanges();
                    return Ok();
                }
                return Conflict(BookListLimit());
            }
            return BadRequest(ModelState);
        }

        [HttpGet]
        [Route("aviablebooks/limit")]
        public int BookListLimit()
        {
            int booksNum = db.Users.Include(b => b.BookList).Single(u => u == currentUser).BookList.Count();
            return (configuration.GetValue<int>("BookListLimit") - booksNum);
        }
    }
}
