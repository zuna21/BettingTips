namespace API.DTOs
{
    public class UserCreateDto
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }        
        public PackageDto Package { get; set; }
    }
}