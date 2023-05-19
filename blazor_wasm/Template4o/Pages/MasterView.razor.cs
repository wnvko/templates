using System.Globalization;
using Template4o.DashboardData;
using Microsoft.AspNetCore.Components;
using IgniteUI.Blazor.Controls;

namespace Template4o.Pages
{
    public partial class MasterView
    {
        [Inject]
        DashboardDataService? dashboardDataService { get; set; }

        private AllTeamMembersType[] dashboardDataAllTeamMembers = Array.Empty<AllTeamMembersType>();
        private CultureInfo cultureInfo = new CultureInfo("en-UK");

        private void FirstNameOnChange(IgbDropdownItemComponentEventArgs e, IgbCellTemplateContext context)
        {
            // This should be done by Id, but data source doesn't provide one
            dashboardDataAllTeamMembers.First(t => t.FirstName == context.Cell.Id.RowID).FirstName = e.Detail.Value;
            this.RefreshGridData();
        }

        private void LastNameOnChange(IgbDropdownItemComponentEventArgs e, IgbCellTemplateContext context)
        {
            // This should be done by Id, but data source doesn't provide one
            dashboardDataAllTeamMembers.First(t => t.FirstName == context.Cell.Id.RowID).LastName = e.Detail.Value;
            this.RefreshGridData();
        }

        private void HireDateOnChange(IgbComponentDateValueChangedEventArgs e, IgbCellTemplateContext context)
        {
            // This should be done by Id, but data source doesn't provide one
            dashboardDataAllTeamMembers.First(t => t.FirstName == context.Cell.Id.RowID).HireDate = e.Detail.ToString();
            this.RefreshGridData();
        }

        private void RefreshGridData()
        {
            dashboardDataAllTeamMembers = (dashboardDataAllTeamMembers.Clone() as AllTeamMembersType[]) ?? dashboardDataAllTeamMembers;
        }

        protected override async Task OnInitializedAsync()
        {
            dashboardDataAllTeamMembers = await dashboardDataService?.GetAllTeamMembers() ?? dashboardDataAllTeamMembers;
        }
    }
}
