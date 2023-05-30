using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IPackageRepository
    {
        Task<ICollection<Package>> GetAllPackages();
        void AddPackage(Package package);
        void DeletePackage(Package package);
        Task<Package> FindPackageById(int id);
        Task<ICollection<Package>> GetPackagesAsync(ICollection<PackageDto> packageDtos);
        Task<bool> SaveAllAsync();
    }
}
