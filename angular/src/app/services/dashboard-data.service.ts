import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardDataService {
  constructor(private http: HttpClient) { }

  public getAllTeamMembers(): Observable<any> {
    return this.http.get(`https://excel2json.io/api/share/d2d94130-e6aa-4387-437e-08da496bf5f2`);
  }
}
