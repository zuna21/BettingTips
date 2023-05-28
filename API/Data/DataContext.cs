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
        public DbSet<Package> Packages { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
             base.OnModelCreating(builder);

             builder.Entity<Tip>()
                .HasMany(m => m.Packages)
                .WithMany(m => m.Tips)
                .UsingEntity(j => j.ToTable("PackageTip"));
        }
    }
}