import { Friend } from '../models/northwind/friend';
import { Person } from '../models/northwind/person';
import { PersonWithFriends } from '../models/northwind/person-with-friends';
import { getPeople, getPeopleWithFriends, getFriends } from '../services/northwind';
import { useEffect, useState } from 'react';

export const useGetPeople = () => {
	const [people, setPeople] = useState<Person[]>([]);

	useEffect(() => {
		let ignore = false;
		getPeople()
			.then((data) => {
				if (!ignore) {
					setPeople(data);
				}
			})
		return () => {
			ignore = true;
		}
	}, []);

	return people;
}

export const useGetPeopleWithFriends = () => {
	const [peopleWithFriends, setPeopleWithFriends] = useState<PersonWithFriends[]>([]);

	useEffect(() => {
		let ignore = false;
		getPeopleWithFriends()
			.then((data) => {
				if (!ignore) {
					setPeopleWithFriends(data);
				}
			})
		return () => {
			ignore = true;
		}
	}, []);

	return peopleWithFriends;
}

export const useGetFriends = () => {
	const [friends, setFriends] = useState<Friend[]>([]);

	useEffect(() => {
		let ignore = false;
		getFriends()
			.then((data) => {
				if (!ignore) {
					setFriends(data);
				}
			})
		return () => {
			ignore = true;
		}
	}, []);

	return friends;
}
