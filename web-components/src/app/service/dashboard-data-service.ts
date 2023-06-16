import { data } from '../static-data/data';

export default class DashboardDataService {
	public getData(tableName: string): any[] {
		return data[tableName];
	}

  public async getAllTeamMembers(): Promise<any> {
    const response = await fetch('https://excel2json.io/api/share/d2d94130-e6aa-4387-437e-08da496bf5f2');
    if (!response.ok) {
      return Promise.reject('Data load failed.');
    }
    return response.json();
  }
}
