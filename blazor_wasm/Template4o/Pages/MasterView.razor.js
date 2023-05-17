let dashboardDataAllTeamMembers = [];

igRegisterScript("hireDateCellTemplate", (ctx) => {
    return window.igTemplating.html`FAST CT ${ctx.cell.value}`
}, false);
igRegisterScript("hireDateCellEditTemplate", (ctx) => {
    return window.igTemplating.html`
        <igc-input .value=${ctx.cell?.value} @igcChange="${e => ctx.cell.value = e.target.value}"></igc-input>
`
}, false);
igRegisterScript("firstNameHeaderTemplate", (ctx) => {
    return window.igTemplating.html`HT ${ctx.column?.header}`
}, false);
igRegisterScript("firstNameInlineEditorTamplate", (ctx) => {
    return window.igTemplating.html`
        <igc-select value=${ctx.cell?.value} @igcChange="${e => ctx.cell.value = e.detail.value}">
            ${dashboardDataAllTeamMembers.map(item => window.igTemplating.html`
                <igc-select-item value="${item.firstName}">${item.firstName}</igc-select-item>
            `)}
        </igx-select>
`
}, false);

window.DashboardDataServiceGetAllTeamMembers = (dotNetHelper, items) => {
    dashboardDataAllTeamMembers = items;
}
