using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookClub.Resource.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public string Name { get; private set; }
        public string Password { get; private set; }
        public virtual ICollection<Book> BookList { get; set; }
        public User(string name, string password)
        {
            this.Id = Guid.NewGuid();
            this.Name = name;
            this.Password = password;
            BookList = new HashSet<Book>();
        }
    }
}
