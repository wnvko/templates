import { Northwind } from '../static-data/northwind';

export default class NorthwindService {
	public getData(tableName: string): any[] {
		return Northwind[tableName];
	}
}
