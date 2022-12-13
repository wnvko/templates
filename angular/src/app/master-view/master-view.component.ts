import { Component, OnInit } from '@angular/core';
import { DashboardDataService } from '../services/dashboard-data.service';

@Component({
  selector: 'app-master-view',
  templateUrl: './master-view.component.html',
  styleUrls: ['./master-view.component.scss']
})
export class MasterViewComponent implements OnInit {
  public dashboardDataAllTeamMembers: any = null;
  public date: Date = new Date();

  constructor(
    private dashboardDataService: DashboardDataService,
  ) {}

  ngOnInit() {
    this.dashboardDataService
      .getAllTeamMembers()
      .subscribe(data => this.dashboardDataAllTeamMembers = data.map((e: any) => {
        e.HireDate = new Date(e.HireDate);
        return e;
    }));
  }
}
