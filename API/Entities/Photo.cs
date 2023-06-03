namespace API.Entities
{
    public class Photo
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Path { get; set; }
        public Tip Tip { get; set; }        
    }
}