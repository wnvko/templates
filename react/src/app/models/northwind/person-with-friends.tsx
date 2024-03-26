import { Friend } from "./friend";

export interface PersonWithFriends {
	id: number;
	first_name: string;
	last_name: string;
	friends: Friend[];
	birthDay: Date;
	hasFriends: boolean;
	age: number;
}
