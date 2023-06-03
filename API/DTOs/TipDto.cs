namespace API.DTOs
{
    public class TipDto
    {
        public int Id { get; set; }
        public string HomeTeam { get; set; }
        public string AwayTeam { get; set; }
        public ICollection<PackageDto> Packages { get; set; }
        public PhotoDto Photo { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;   
    }
}