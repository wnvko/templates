import { Friend } from '../models/northwind/friend';
import { Person } from '../models/northwind/person';
import { PersonWithFriends } from '../models/northwind/person-with-friends';

export async function getPeople(): Promise<Person[]> {
	const response = await fetch('./static-data/northwind-people.json');
	if (!response.ok) {
		return Promise.resolve([]);
	}
	return response.json();
}

export async function getPeopleWithFriends(): Promise<PersonWithFriends[]> {
	const response = await fetch('./static-data/northwind-people-with-friends.json');
	if (!response.ok) {
		return Promise.resolve([]);
	}
	return response.json();
}

export async function getFriends(): Promise<Friend[]> {
	const response = await fetch('./static-data/northwind-friends.json');
	if (!response.ok) {
		return Promise.resolve([]);
	}
	return response.json();
}