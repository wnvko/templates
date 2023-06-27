export interface ProductsType {
	productID: number;
	supplierID: number;
	categoryID: number;
	quantityPerUnit: string;
	unitPrice: number;
	unitsInStock: number;
	unitsOnOrder: number;
	reorderLevel: number;
	discontinued: boolean;
	name: string;
}
export interface Person {
	id: number;
	first_name: string;
	last_name: string;
	friends: string[];
	birthDay: Date;
	hasFriends: boolean;
	age: number;
}
export interface Friend {
	id: string;
	first_name: string;
	last_name: string;
}
