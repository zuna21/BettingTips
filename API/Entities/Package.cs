namespace API.Entities
{
    public class Package
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }       
        public ICollection<Tip> Tips { get; set; }
    }
}