import '@infragistics/igniteui-webcomponents-grids/grids/combined.js';
import { css, html, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { defineComponents, IgcRatingComponent, IgcSelectComponent } from 'igniteui-webcomponents';
import DashboardDataService from '../service/dashboard-data-service';

defineComponents(IgcRatingComponent, IgcSelectComponent);

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
    dashboardDataService.getAllTeamMembers().then((data: any) => {
      this.dashboardDataAllTeamMembers = data.map((e: any) => {
        e.HireDate = new Date(e.HireDate);
        return e;
      });
    }, err => console.log(err));
  }

  @property({ type: Array })
  private dashboardDataAllTeamMembers?: any[];

  @query("cellEditor")
  private cellEditor?: HTMLInputElement;

  public gridFirstNameHeaderTemplate = (ctx: any) => html`
      HT ${ctx.column?.field.toUpperCase()}
      `

  public gridLastNameCellTemplate = (ctx: any) => html`
      CT ${ctx.cell?.value?.toUpperCase()}
      `

  public idCellTemplate = (ctx: any) => html`
    <igc-rating value=${ctx.cell?.value / 5} readonly></igc-rating>
  `

  public gridHireDataCellEditorTemplate = (ctx: any) => html`
        <input .value="${ctx.cell?.editValue}" @change="${(e: Event) => { ctx.cell.value = (e.target as HTMLInputElement).value; }}"/>
      `

  public gridFirstNameCellEditorTemplate = (ctx: any) => html`
      <igc-select .value="${ctx.cell.editValue}" @igcChange="${(e: any) => { ctx.cell.value = e.detail.value; }}">
        ${this.dashboardDataAllTeamMembers?.map((item: any) => html`
          <igc-select-item value="${item.FirstName}">
            ${item.FirstName}
          </igc-select-item>
        `)}
      </igc-select>
    `

  render() {
    return html`
      <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'>
      <link href='https://fonts.googleapis.com/css?family=Titillium+Web' rel='stylesheet'>
      <link rel='stylesheet' href='../../ig-theme.css'>
      <link rel='stylesheet' href='node_modules/@infragistics/igniteui-webcomponents-grids/grids/themes/light/material.css'>
      <igc-grid .data="${this.dashboardDataAllTeamMembers}" auto-generate="false" primary-key="FirstName" width="800px" height="600px" class="ig-typography grid">
        <igc-column field="FirstName" .headerTemplate="${this.gridFirstNameHeaderTemplate}" .inlineEditorTemplate="${this.gridFirstNameCellEditorTemplate}" editable="true"></igc-column>
        <igc-column field="LastName" .bodyTemplate="${this.gridLastNameCellTemplate}"></igc-column>
        <igc-column field="Id" .bodyTemplate="${this.idCellTemplate}"></igc-column>
        <igc-column field="HireDate" .inlineEditorTemplate="${this.gridHireDataCellEditorTemplate}" data-type="date" editable="true"></igc-column>
      </igc-grid>
    `;
  }
}
