namespace API.DTOs
{
    public class PackageDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int ActiveDays { get; set; }
        public double Price { get; set; }
    }
}