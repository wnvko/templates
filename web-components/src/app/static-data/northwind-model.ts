export interface Person {
	id: number;
	first_name: string;
	last_name: string;
	friends: number[];
	birthDay: Date;
	hasFriends: boolean;
	age: number;
}
export interface PersonWithFriends {
	id: number;
	first_name: string;
	last_name: string;
	friends: Friend[];
	birthDay: Date;
	hasFriends: boolean;
	age: number;
}
export interface Friend {
	id: number;
	first_name: string;
	last_name: string;
}
