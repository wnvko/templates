using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Template4o;
using Template4o.Services;
using IgniteUI.Blazor.Controls;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
builder.Services.AddScoped<IDataService>(sp => new DataService(new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) }));
RegisterIgniteUI(builder.Services);

await builder.Build().RunAsync();

void RegisterIgniteUI(IServiceCollection services)
{
    services.AddIgniteUIBlazor(
        typeof(IgbCheckboxModule),
        typeof(IgbComboModule),
        typeof(IgbDateTimeInputModule),
        typeof(IgbGridModule),
        typeof(IgbInputModule),
        typeof(IgbSelectModule),
        typeof(IgbSwitchModule)
    );
}