using System.Net.Http.Json;

namespace Template4o.DashboardData
{
    public class DashboardDataService
    {
        private readonly HttpClient http;

        public DashboardDataService(HttpClient http)
        {
            this.http = http;
        }

        public async Task<AllTeamMembersType[]?> GetAllTeamMembers()
        {
            using HttpResponseMessage response = await http.GetAsync("https://excel2json.io/api/share/d2d94130-e6aa-4387-437e-08da496bf5f2").ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                return await response.Content.ReadFromJsonAsync<AllTeamMembersType[]>().ConfigureAwait(false);
            }

            return null;
        }
    }
}