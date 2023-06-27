using System.Net.Http.Json;
using Template4o.Models;

namespace Template4o.Services
{
    public class DataService : IDataService
    {
        private readonly HttpClient _http;

        public DataService(HttpClient http)
        {
            _http = http;
        }

        public async Task<List<Person>> GetPeople()
        {
            using HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, new Uri("/static-data/people.json", UriKind.RelativeOrAbsolute));
            using HttpResponseMessage response = await _http.SendAsync(request).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                return await response.Content.ReadFromJsonAsync<List<Person>>().ConfigureAwait(false);
            }

            return new List<Person>();
        }

        public async Task<List<Friend>> GetFriends()
        {
            using HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, new Uri("/static-data/friends.json", UriKind.RelativeOrAbsolute));
            using HttpResponseMessage response = await _http.SendAsync(request).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                return await response.Content.ReadFromJsonAsync<List<Friend>>().ConfigureAwait(false);
            }

            return new List<Friend>();
        }
    }
}