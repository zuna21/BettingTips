using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class TipRepository : ITipRepository
    {
        private readonly DataContext _context;
        public TipRepository(
            DataContext context
        )
        {
            _context = context;
        }

        public void AddTip(Tip tip)
        {
            _context.Tips.Add(tip);
        }

        public void DeleteTip(Tip tip)
        {
            _context.Tips.Remove(tip);
        }

        public async Task<ICollection<Tip>> GetActiveTipsByPackageId(int id)
        {
            return await _context.Tips
                .Where(x => x.Status == "active")
                .Where(x => x.Packages.Select(y => y.Id).Contains(id))
                .Include(x => x.Packages)
                .Include(x => x.Photo)
                .ToListAsync();
        }

        public async Task<ICollection<Tip>> GetAllActiveTips()
        {
            return await _context.Tips
                .Where(x => x.Status == "active")
                .Include(x => x.Packages)
                .Include(x => x.Photo)
                .ToListAsync();
        }

        public async Task<ICollection<Tip>> GetAllTips()
        {
            return await _context.Tips
                .Include(x => x.Photo)
                .ToListAsync();
        }

        public async Task<Tip> GetTipById(int id)
        {
            return await _context.Tips
                .Include(x => x.Photo)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}