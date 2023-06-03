using API.Entities;

namespace API.Interfaces
{
    public interface IUserRepository
    {
        Task<bool> IsUsernameTaken(AppUser user);
        void AddNewUser(AppUser user);
        Task<AppUser> GetUserByUsername(string username);
        Task<bool> SaveAllAsync();
    }
}