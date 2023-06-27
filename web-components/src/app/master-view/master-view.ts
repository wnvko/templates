import { IgcCellTemplateContext } from '@infragistics/igniteui-webcomponents-grids/grids';
import '@infragistics/igniteui-webcomponents-grids/grids/combined.js';
import { IgcCalendarComponent, IgcCheckboxComponent, IgcComboComponent, IgcDateTimeInputComponent, IgcInputComponent, IgcSelectComponent, IgcSwitchComponent, defineComponents } from 'igniteui-webcomponents';
import { IgcComboChangeEventArgs } from 'igniteui-webcomponents/components/combo/types';
import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import NorthwindService from '../service/Northwind-service';
import { Friend, Person, ProductsType } from '../static-data/northwind-model';

defineComponents(IgcCalendarComponent, IgcCheckboxComponent, IgcComboComponent, IgcDateTimeInputComponent, IgcInputComponent, IgcSelectComponent, IgcSwitchComponent);

@customElement('app-master-view')
export default class MasterView extends LitElement {
  static styles = css`
    :host {
      height: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: stretch;
      align-content: flex-start;
    }
    .grid {
      min-width: 600px;
      min-height: 300px;
      flex-grow: 1;
      flex-basis: 0;
    }
    .combo {
      height: max-content;
    }
  `;

  constructor() {
    super();
    this.northwindProducts = this.northwindService.getData('ProductsType');
    this.people = this.northwindService.getData('People');
    this.friends = this.northwindService.getData('Friends');
  }

  private northwindService: NorthwindService = new NorthwindService();

  @property()
  private northwindProducts?: ProductsType[];
  private people?: Person[];
  private friends?: Friend[];


  public comboBodyTemplate = (ctx: IgcCellTemplateContext) => html`
    <igc-combo .data="${this.friends}" .value="${ctx.cell.value}"
      value-key="id"
      display-key="first_name"
      master_view-scope
      class="combo">
    </igc-combo>
  `

  public comboInlineEditorTemplate = (ctx: IgcCellTemplateContext) => html`
    <igc-combo .data="${this.friends}" .value="${ctx.cell.editValue}" @igcChange="${(e: CustomEvent<IgcComboChangeEventArgs>) => ctx.cell.editValue = e.detail.newValue}"
        value-key="id"
        display-key="first_name"
        master_view-scope
        class="combo">
    </igc-combo>
  `

  public selectInlineEditorTemplate = (ctx: IgcCellTemplateContext) => html`
    <igc-select .value="${ctx.cell.editValue}" @igcChange="${(e: any) => ctx.cell.editValue = e.detail.value}" master_view-scope class="select">
      ${this.people!.map(item => html`
        <igc-select-item .value="${item.last_name}">
          ${item.last_name}
        </igc-select-item>
      `)}
    </igc-select>
  `

  public textInputInlineEditorTemplate = (ctx: IgcCellTemplateContext) => html`
    <igc-input type="text" .value="${ctx.cell.editValue}" @igcChange="${(e: CustomEvent<string>) => ctx.cell.editValue = e.detail}" master_view-scope class="input"></igc-input>
  `

  public numberInputInlineEditorTemplate = (ctx: IgcCellTemplateContext) => html`
    <igc-input type="number" .value="${ctx.cell.editValue}" @igcChange="${(e: CustomEvent<number>) => ctx.cell.editValue = e.detail}" master_view-scope class="input"></igc-input>
  `

  public dateInputInlineEditorTemplate = (ctx: IgcCellTemplateContext) => html`
    <igc-date-time-input type="number" .value="${ctx.cell.editValue}" @igcChange="${(e: CustomEvent<Date | null>) => ctx.cell.editValue = e.detail}" master_view-scope class="input"></igc-date-time-input>
  `

  public switchInlineEditorTemplate = (ctx: IgcCellTemplateContext) => html`
		<igc-switch .checked="${ctx.cell.editValue}" @igcChange="${(e: any) => { ctx.cell.editValue = e.detail; }}" master_view-scope class="switch"></igc-switch>
	`

  public calendarInlineEditorTemplate = (ctx: IgcCellTemplateContext) => html`
  	<igc-calendar value="${ctx.cell.editValue}" @igcChange="${(e: CustomEvent<Date | Date[]>) => ctx.cell.editValue = e.detail}" master_view-scope class="calendar"></igc-calendar>
  `

  render() {
    return html`
      <link rel='stylesheet' href='../../ig-theme.css'>
      <link rel='stylesheet' href='node_modules/@infragistics/igniteui-webcomponents-grids/grids/themes/light/material.css'>
      <igc-grid .data="${this.people}" primary-key="id" row-editable="true" auto-generate="false" class="ig-typography ig-scrollbar grid">
        <igc-column field="first_name" data-type="string" .inlineEditorTemplate="${this.textInputInlineEditorTemplate}"></igc-column>
        <igc-column field="last_name" data-type="string" .inlineEditorTemplate="${this.selectInlineEditorTemplate}"></igc-column>
        <igc-column field="friends" .bodyTemplate="${this.comboBodyTemplate}" .inlineEditorTemplate="${this.comboInlineEditorTemplate}"></igc-column>
        <igc-column field="birthDay" data-type="date" .inlineEditorTemplate="${this.calendarInlineEditorTemplate}"></igc-column>
        <igc-column field="hasFriends" .inlineEditorTemplate="${this.switchInlineEditorTemplate}" data-type="boolean"></igc-column>
        <igc-column field="age" data-type="number".inlineEditorTemplate="${this.numberInputInlineEditorTemplate}"></igc-column>
      </igc-grid>
    `;
  }
}
