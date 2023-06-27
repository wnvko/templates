using Template4o.Models;

namespace Template4o.Services
{
    public interface IDataService
    {
        Task<List<Person>> GetPeople();

        Task<List<Friend>> GetFriends();
    }
}
