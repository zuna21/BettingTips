namespace API.DTOs
{
    public class PackageCreateDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int ActiveDays { get; set; }
        public double Price { get; set; }
    }
}