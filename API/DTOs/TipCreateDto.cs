namespace API.DTOs
{
    public class TipCreateDto
    {
        public int PackageId { get; set; }
        public string HomeTeam { get; set; }
        public string AwayTeam { get; set; }
    }
}