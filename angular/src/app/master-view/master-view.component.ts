import { Component, OnInit } from '@angular/core';
import { DashboardDataService } from '../services/dashboard-data.service';
import { defineComponents, IgcRatingComponent } from 'igniteui-webcomponents';

defineComponents(IgcRatingComponent);

@Component({
  selector: 'app-master-view',
  templateUrl: './master-view.component.html',
  styleUrls: ['./master-view.component.scss']
})
export class MasterViewComponent implements OnInit {
  public dashboardDataAllTeamMembers: any = null;
  public departments: string[] = [];

  constructor(
    private dashboardDataService: DashboardDataService,
  ) {}

  ngOnInit() {
    this.dashboardDataService
      .getAllTeamMembers()
      .subscribe(data => this.dashboardDataAllTeamMembers = data.map((e: any) => {
        e.HireDate = new Date(e.HireDate);
        if (this.departments.indexOf(e.Department) < 0) {
          this.departments.push(e.Department);
        }
        return e;
    }));
  }

  public parse = (value: string | any[]): string => {
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    return value;
  }
}
