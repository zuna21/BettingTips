namespace API.DTOs
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
        public PackageDto Package { get; set; }
        public bool IsAdmin { get; set; }
        public bool HasSubscription { get; set; }
        public DateTime StartDate { get; set;}
        public DateTime EndDate { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}