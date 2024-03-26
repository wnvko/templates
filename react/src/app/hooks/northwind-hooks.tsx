import { getPeople, getPeopleWithFriends, getFriends } from '../services/northwind';
import { useEffect, useState } from 'react';

export const useGetPeople = () => {
	const [People, setPeople] = useState([]);

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

	return People;
}

export const useGetPeopleWithFriends = () => {
	const [PeopleWithFriends, setPeopleWithFriends] = useState([]);

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

	return PeopleWithFriends;
}

export const useGetFriends = () => {
	const [Friends, setFriends] = useState([]);

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

	return Friends;
}
