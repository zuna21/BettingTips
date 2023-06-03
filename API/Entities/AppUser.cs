namespace API.Entities
{
    public class AppUser
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public byte[] PasswordHash1 { get; set; }
        public byte[] PasswordHash2 { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string Email { get; set; }
        public bool IsAdmin { get; set; } = false;
        public int PackageId { get; set; }
        public Package Package { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;        
    }
}