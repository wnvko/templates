namespace Template4o.Models
{
    public class Person
    {
        public int Id { get; set; }
        public  string First_Name { get; set; }
        public string Last_Name { get; set;}
        public  ICollection<string> Friends { get; set; } = new List<string>();
        public DateTime BirthDay { get; set; }
        public bool HasFriends { get; set; }
        public int Age { get; set; }
    }
}
