using API.DTOs;
using API.Entities;
using API.Interfaces;

namespace API.Data
{
    public class PhotoRepository : IPhotoRepository
    {
        private readonly DataContext _context;
        public PhotoRepository(DataContext context)
        {
            _context = context;
        }

        public void AddNewPhoto(Photo photo)
        {
            _context.Photos.Add(photo);
        }

        public async Task<Photo> GetPhotoById(int id)
        {
            return await _context.Photos.FindAsync(id);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}