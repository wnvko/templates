import { IgcCellTemplateContext, IgcColumnTemplateContext } from '@infragistics/igniteui-webcomponents-grids/grids';
import '@infragistics/igniteui-webcomponents-grids/grids/combined.js';
import { defineComponents, IgcComboComponent, IgcRatingComponent, IgcSelectComponent } from 'igniteui-webcomponents';
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import DashboardDataService from '../service/dashboard-data-service';

defineComponents(IgcComboComponent, IgcRatingComponent, IgcSelectComponent);

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
    }
  `;

  constructor() {
    super();
    const dashboardDataService: DashboardDataService = new DashboardDataService();
    this.dashboardDataAllTeamMembers = dashboardDataService.getData('Employees');
    this.siblings = dashboardDataService.getData('Siblings');
  }

  @property({ type: Array })
  private dashboardDataAllTeamMembers: any[] = [];

  @property({ type: Array })
  private siblings: any[] = [];

  public gridFirstNameHeaderTemplate = (ctx: IgcColumnTemplateContext) => html`
      HT ${ctx.column?.field.toUpperCase()}
      `

  public gridLastNameCellTemplate = (ctx: IgcCellTemplateContext) => html`
      CT ${ctx.cell?.value?.toUpperCase()}
      `

  public idCellTemplate = (ctx: IgcCellTemplateContext) => html`
    <igc-rating value=${ctx.cell?.value / 4} readonly></igc-rating>
  `

  public gridHireDataCellEditorTemplate = (ctx: IgcCellTemplateContext) => html`
        <input id="cellEditor" .value="${ctx.cell?.editValue}" @change="${(e: Event) => { ctx.cell.value = (e.target as HTMLInputElement).value; }}"/>
      `

  public gridFirstNameCellEditorTemplate = (ctx: IgcCellTemplateContext) => html`
      <igc-select .value="${ctx.cell.editValue}" @igcChange="${(e: any) => { ctx.cell.editValue = e.detail.value; }}">
        ${this.dashboardDataAllTeamMembers?.map((item: any) => html`
          <igc-select-item value="${item.FirstName}">
            ${item.FirstName}
          </igc-select-item>
        `)}
      </igc-select>
    `

  public gridSiblingsCellTemplate = (ctx: IgcCellTemplateContext) => html`
    CT ${ctx.cell?.value?.join()}
    `

  public gridSiblingsCellEditorTemplate = (ctx: IgcCellTemplateContext) => html`
      <igc-combo .data="${this.dashboardDataAllTeamMembers}" value-key="LastName" display-key="LastName"
        .value=${ctx.cell.editValue} @igcChange="${(e: any) => { ctx.cell.editValue = e.detail.newValue?.split(', ') }}">
      </igc-combo>
  `

  render() {
    return html`
      <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'>
      <link href='https://fonts.googleapis.com/css?family=Titillium+Web' rel='stylesheet'>
      <link rel='stylesheet' href='../../ig-theme.css'>
      <link rel='stylesheet' href='node_modules/@infragistics/igniteui-webcomponents-grids/grids/themes/light/bootstrap.css'>
      <igc-grid row-editable .data="${this.dashboardDataAllTeamMembers}" auto-generate="false" primary-key="ID" width="1200px" height="600px" class="ig-typography grid">
        <igc-column field="FirstName" .headerTemplate="${this.gridFirstNameHeaderTemplate}" .inlineEditorTemplate="${this.gridFirstNameCellEditorTemplate}" editable="true"></igc-column>
        <igc-column field="Siblings" editable="true" .bodyTemplate="${this.gridSiblingsCellTemplate}" .inlineEditorTemplate="${this.gridSiblingsCellEditorTemplate}"></igc-column>
        <igc-column field="LastName" .bodyTemplate="${this.gridLastNameCellTemplate}"></igc-column>
        <igc-column field="ID" .bodyTemplate="${this.idCellTemplate}"></igc-column>
        <igc-column field="HireDate" .inlineEditorTemplate="${this.gridHireDataCellEditorTemplate}" data-type="date" editable="true"></igc-column>
      </igc-grid>
    `;
  }
}
