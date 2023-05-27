using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }
    
        public DbSet<AppUser> Users { get; set; }
        public DbSet<Tip> Tips { get; set; }
    }
}