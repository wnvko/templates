const html = window.igTemplating.html;
let people = [];
let friends = [];

igRegisterScript("comboBodyTemplate", (ctx) => {
    return html`
        <igc-combo .data="${friends}" .value="${ctx.cell.value}"
            value-key="id"
            display-key="first_Name"
            master_view-scope
            class="combo">
        </igc-combo>
    `
}, false);

igRegisterScript("comboInlineEditorTemplate", (ctx) => {
    return html`
        <igc-combo .data="${friends}" .value="${ctx.cell.editValue}" @igcChange="${(e) => ctx.cell.editValue = e.detail.newValue}"
            value-key="id"
            display-key="first_Name"
            master_view-scope
            class="combo">
        </igc-combo>
    `
}, false);

igRegisterScript("selectInlineEditorTemplate", (ctx) => {
    return html`
        <igc-select .value="${ctx.cell.editValue}" @igcChange="${(e) => ctx.cell.editValue = e.detail.value}" master_view-scope class="select">
            ${people.map(item => html`
                <igc-select-item .value="${item.last_Name}">
                ${item.last_Name}
                </igc-select-item>
            `)}
        </igc-select>
    `
}, false);

igRegisterScript("textInputInlineEditorTemplate", (ctx) => {
    return html`
        <igc-input type="text" .value="${ctx.cell.editValue}" @igcChange="${(e) => ctx.cell.editValue = e.detail}" master_view-scope class="input"></igc-input>
    `
}, false);

igRegisterScript("numberInputInlineEditorTemplate", (ctx) => {
    return html`
        <igc-input type="number" .value="${ctx.cell.editValue}" @igcChange="${(e) => ctx.cell.editValue = e.detail}" master_view-scope class="input"></igc-input>
    `
}, false);

igRegisterScript("dateInputInlineEditorTemplate", (ctx) => {
    return html`
        <igc-date-time-input type="number" .value="${ctx.cell.editValue}" @igcChange="${(e) => ctx.cell.editValue = e.detail}" master_view-scope class="input"></igc-date-time-input>
    `
}, false);

igRegisterScript("switchInlineEditorTemplate", (ctx) => {
    return html`
        <igc-switch .checked="${ctx.cell.editValue}" @igcChange="${(e) => { ctx.cell.editValue = e.detail; }}" master_view-scope class="switch"></igc-switch>
    `
}, false);

window.TransferMasterView = (view) => {
    people = view.people;
    friends = view.friends;
}
