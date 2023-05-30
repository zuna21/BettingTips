using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class PackageRepository : IPackageRepository
    {
        private readonly DataContext _context;
        public PackageRepository(
            DataContext context
        )
        {
            _context = context;
        }
        public void AddPackage(Package package)
        {
            _context.Add(package);
        }

        public void DeletePackage(Package package)
        {
            _context.Remove(package);
        }

        public async Task<Package> FindPackageById(int id)
        {
            return await _context.Packages.FindAsync(id);
        }

        public async Task<ICollection<Package>> GetAllPackages()
        {
            return await _context.Packages.ToListAsync();
        }

        public async Task<ICollection<Package>> GetPackagesAsync(ICollection<PackageDto> packageDtos)
        {
            return await _context.Packages.Where(
                m => packageDtos.Select(mi => mi.Id).Contains(m.Id)
            ).ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}