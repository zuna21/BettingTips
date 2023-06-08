using API.Entities;

namespace API.Interfaces
{
    public interface ITipRepository
    {
        void AddTip(Tip tip);
        void DeleteTip(Tip tip);
        Task<Tip> GetTipById(int id);
        Task<ICollection<Tip>> GetActiveTipsByPackageId(int id);
        Task<ICollection<Tip>> GetAllActiveTips();
        Task<ICollection<Tip>> GetAllTips();
        Task<bool> SaveAllAsync();        
    }
}