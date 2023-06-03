using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        public UserRepository(
            DataContext context
        )
        {
            _context = context;
        }
        public void AddNewUser(AppUser user)
        {
            _context.Users.Add(user);
        }

        public async Task<AppUser> GetUserByUsername(string username)
        {
            return await _context.Users.FirstOrDefaultAsync(x => x.UserName == username.ToLower());
        }

        public async Task<bool> IsUsernameTaken(AppUser user)
        {
            var selectedUser = await _context.Users.FirstOrDefaultAsync(x => x.UserName == user.UserName.ToLower());
            if (selectedUser == null) return false;
            return true;
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}