import '@infragistics/igniteui-webcomponents-grids/grids/combined.js';
import { css, html, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import DashboardDataService from '../service/dashboard-data-service';

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
      dashboardDataService.getAllTeamMembers().then(data => {
        this.dashboardDataAllTeamMembers = data.map((e: any) => {
          e.HireDate = new Date(e.HireDate);
          return e;
        })
        }, err => console.log(err));
  }

  @property({type: Array})
  private dashboardDataAllTeamMembers?: any[];

  @query("cellEditor")
  private cellEditor?: HTMLInputElement;

  public gridFirstNameHeaderTemplate = (ctx: any) => { // TODO: ctx: IgcColumnTemplateContext
    return html`
      HT ${ctx.column?.field.toUpperCase()}
      `;
  }

  public gridLastNameCellTemplate = (ctx: any) => { // TODO: ctx: IgcCellTemplateContext
    return html`
      CT ${ctx.cell?.value.toUpperCase()}
      `;
  }

  public gridHireDataCellEditorTemplate = (ctx: any) => { // TODO: ctx: IgxCellEditorTemplateDirective
    return html`
        <input .value="${ctx.cell?.value}" @change="${(e: Event) => ctx.cell.value = (e.target! as HTMLInputElement).value}"/>
      `;
  }

  render() {
    return html`
      <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'>
      <link href='https://fonts.googleapis.com/css?family=Titillium+Web' rel='stylesheet'>
      <link rel='stylesheet' href='../../ig-theme.css'>
      <link rel='stylesheet' href='node_modules/@infragistics/igniteui-webcomponents-grids/grids/themes/light/material.css'>
      <igc-grid .data="${this.dashboardDataAllTeamMembers}" auto-generate="false" primary-key="FirstName" width="800px" height="600px" class="ig-typography grid">
        <igc-column .headerTemplate="${this.gridFirstNameHeaderTemplate}" field="FirstName" groupable="true"></igc-column>
        <igc-column .bodyTemplate="${this.gridLastNameCellTemplate}" field="LastName"></igc-column>
        <igc-column field="HireDate" .inlineEditorTemplate="${this.gridHireDataCellEditorTemplate}" data-type="date" editable="true"></igc-column>
      </igc-grid>
    `;
  }
}
