using API.Entities;

namespace API.Interfaces
{
    public interface IUserRepository
    {
        Task<bool> IsUsernameTaken(string username);
        void AddNewUser(AppUser user);
        void DeleteUser(AppUser user);
        Task<AppUser> GetUserByUsername(string username);
        Task<AppUser> GetUserById(int id);
        Task<ICollection<AppUser>> GetAllUsers();
        Task<bool> SaveAllAsync();
    }
}