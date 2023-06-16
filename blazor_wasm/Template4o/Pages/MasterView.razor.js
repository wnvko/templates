let html = window.igTemplating.html;
let dashboardDataAllTeamMembers = [];

igRegisterScript("hireDateCellTemplate", (ctx) => {
    return html`FAST CT ${ctx.cell.value}`
}, false);
igRegisterScript("idCellTemplate", (ctx) => {
    return html`<igc-rating value=${ctx.cell.value / 5} readonly></igc-rating>`
}, false);
igRegisterScript("hireDateCellEditTemplate", (ctx) => {
    return html`
        <igc-input .value=${ctx.cell?.value} @igcChange="${e => ctx.cell.value = e.target.value}"></igc-input>
`
}, false);
igRegisterScript("firstNameHeaderTemplate", (ctx) => {
    return html`HT ${ctx.column?.header}`
}, false);
igRegisterScript("firstNameInlineEditorTamplate", (ctx) => {
    return html`
        <igc-select value=${ctx.cell?.value} @igcChange="${e => ctx.cell.value = e.detail.value}">
            ${dashboardDataAllTeamMembers.map(item => html`
                <igc-select-item value="${item.firstName}">${item.firstName}</igc-select-item>
            `)}
        </igc-select>
`
}, false);
igRegisterScript("lastNameInlineEditorTamplate", (ctx) => {
    return html`
    <igc-combo .data="${this.dashboardDataAllTeamMembers}" .display-key="lastname"></igc-combo>
    `
}, false);

window.TransferMasterView = (view) => {
    dashboardDataAllTeamMembers = view.dashboardDataAllTeamMembers;
}
