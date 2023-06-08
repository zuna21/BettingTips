using API.Entities;

namespace API.Interfaces
{
    public interface IPhotoRepository
    {
        void AddNewPhoto(Photo photo);
        Task<Photo> GetPhotoById(int id);
        void DeletePhoto(Photo photo);
        Task<bool> SaveAllAsync();
    }
}