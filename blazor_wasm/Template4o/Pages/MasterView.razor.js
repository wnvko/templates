igRegisterScript("hireDateCellTemplate", (ctx) => {
    return window.igTemplating.html`FAST CT ${ctx.cell.value}`
}, false);
igRegisterScript("hireDateCellEditTemplate", (ctx) => {
    return window.igTemplating.html`<input value="${ctx.cell?.value}" @change="${e => ctx.cell.value = e.target.value}" />`;
}, false);
igRegisterScript("firstNameHeaderTemplate", (ctx) => {
    return window.igTemplating.html`HT ${ctx.column?.header}`
}, false);
