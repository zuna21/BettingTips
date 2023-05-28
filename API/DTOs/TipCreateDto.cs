namespace API.DTOs
{
    public class TipCreateDto
    {
        public string HomeTeam { get; set; }
        public string AwayTeam { get; set; }
        public ICollection<PackageDto> Packages { get; set; }
    }
}