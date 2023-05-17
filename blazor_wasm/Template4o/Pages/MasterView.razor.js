igRegisterScript("hireDateCellTemplate", (ctx) => {
    return window.igTemplating.html`FAST CT ${ctx.cell.value}`
}, false);
igRegisterScript("hireDateCellEditTemplate", (ctx) => {
    return window.igTemplating.html`
    <igx-input-group>
        <input igxInput value="${ctx.cell?.value}" @change="${e => ctx.cell.value = e.target.value}" />
    <igx-input-group>
`
}, false);
igRegisterScript("firstNameHeaderTemplate", (ctx) => {
    return window.igTemplating.html`HT ${ctx.column?.header}`
}, false);
igRegisterScript("firstNameInlineEditorTamplate", (ctx) => {
    var items = [
        { "FirstName": "Ann" },
        { "FirstName": "Bob" },
        { "FirstName": "Con" },
        { "FirstName": "Dan" },
    ]

    return window.igTemplating.html`
        <igx-select>
            <igx-select-item>Ann</igx-select-item>
            <igx-select-item>Ann</igx-select-item>
            <igx-select-item>Ann</igx-select-item>
        </igx-select>
`
}, false);

/*<igx-select-item * ngFor="let item of items" value = "item.FirstName" > item.FirstName</igx - select - item >*/
