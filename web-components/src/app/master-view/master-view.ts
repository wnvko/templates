import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { IgcCellTemplateContext } from '@infragistics/igniteui-webcomponents-grids/grids';
import { defineComponents, IgcCheckboxComponent, IgcComboComponent, IgcInputComponent, IgcDateTimeInputComponent } from 'igniteui-webcomponents';
import '@infragistics/igniteui-webcomponents-grids/grids/combined.js';
import { Friend, Person, ProductsType } from '../static-data/northwind-model';
import NorthwindService from '../service/Northwind-service';
import { IgcComboChangeEventArgs } from 'igniteui-webcomponents/components/combo/types';

defineComponents(IgcCheckboxComponent, IgcComboComponent, IgcInputComponent, IgcDateTimeInputComponent);

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

  public comboInlineEditorTemplate = (ctx: IgcCellTemplateContext) => {
    return html`
      <igc-combo .data="${this.friends}" .value="${ctx.cell.editValue}" @igcChange="${(e: CustomEvent<IgcComboChangeEventArgs>) => ctx.cell.editValue = e.detail.newValue}"
          value-key="id"
          display-key="first_name"
          master_view-scope
          class="combo">
      </igc-combo>
    `;
  }

  public textInputInlineEditorTemplate = (ctx: IgcCellTemplateContext) => html`
    <igc-input type="text" .value="${ctx.cell.editValue}" @igcChange="${(e: CustomEvent<string>) => ctx.cell.editValue = e.detail}" master_view-scope class="input"></igc-input>
    `

  public numberInputInlineEditorTemplate = (ctx: IgcCellTemplateContext) => html`
    <igc-input type="number" .value="${ctx.cell.editValue}" @igcChange="${(e: CustomEvent<number>) => ctx.cell.editValue = e.detail}" master_view-scope class="input"></igc-input>
    `

  public dateInputInlineEditorTemplate = (ctx: IgcCellTemplateContext) => html`
    <igc-date-time-input type="number" .value="${ctx.cell.editValue}" @igcChange="${(e: CustomEvent<Date | null>) => ctx.cell.editValue = e.detail}" master_view-scope class="input"></igc-date-time-input>
    `

  render() {
    return html`
      <link rel='stylesheet' href='../../ig-theme.css'>
      <link rel='stylesheet' href='node_modules/@infragistics/igniteui-webcomponents-grids/grids/themes/light/material.css'>
      <igc-grid .data="${this.people}" primary-key="id" row-editable="true" auto-generate="false" class="ig-typography ig-scrollbar grid">
        <igc-column field="first_name" data-type="string" .inlineEditorTemplate="${this.textInputInlineEditorTemplate}"></igc-column>
        <igc-column field="last_name" data-type="string" ></igc-column>
        <igc-column field="friends" .bodyTemplate="${this.comboBodyTemplate}" .inlineEditorTemplate="${this.comboInlineEditorTemplate}"></igc-column>
        <igc-column field="birthDay" data-type="date" .inlineEditorTemplate="${this.dateInputInlineEditorTemplate}"></igc-column>
        <igc-column field="hasFriends" data-type="boolean"></igc-column>
        <igc-column field="age" data-type="number".inlineEditorTemplate="${this.numberInputInlineEditorTemplate}"></igc-column>
      </igc-grid>
    `;
  }
}
