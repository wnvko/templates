//namespace Template4o.Data.DashboardData; // Razor won't recognize third level namespace
namespace Template4o.DashboardData;

public class AllTeamMembersType
{
    public int ID { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? HireDate { get; set; }
    public string? Department { get; set; }
    public string? Position { get; set; }
    public string? Email { get; set; }
    public string? Phone { get; set; }
    public string? Photo { get; set; }
}
