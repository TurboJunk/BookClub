using System.Collections.Generic;

namespace BookClub.Resource.Models
{
    public class Book
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Author { get; set; }
        public virtual ICollection<User> UserList { get; set; }
        public Book()
        {
            UserList = new HashSet<User>();
        }
    }
}