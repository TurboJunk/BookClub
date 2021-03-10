using BookClub.Resource.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookClub.Resource
{
    public class DataContext : DbContext
    {
        public DbSet<Book> Books { get; set; }
        public DbSet<User> Users { get; set; }
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var books = new Book[] {
                new Book { Id = 1, Name = "Пикник на обочине", Author = "Стругацкий А. Стругацкий Б." },
                new Book { Id = 2, Name = "Мечта на поражение", Author = "Калугин А." },
                new Book { Id = 3, Name = "Группа Тревиля", Author = "Березин В." },
                new Book { Id = 4, Name = "Группа Эскорта", Author = "Зорич А. Березин В." },
                new Book { Id = 5, Name = "Дети дупликатора", Author = "Васильев В." },
                new Book { Id = 6, Name = "Берег Дна", Author = "Шульга В." },
                new Book { Id = 7, Name = "Эпицентр удачи", Author = "Янковский Д." },
                new Book { Id = 8, Name = "Константа связи", Author = "Слюсаренко С." }
            };

            var users = new User[]
            {
                new User("admin", "admin")
            };
            modelBuilder.Entity<Book>().HasData(books);
            modelBuilder.Entity<User>().HasData(users);
        }
    }
}
