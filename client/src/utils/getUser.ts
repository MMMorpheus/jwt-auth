import { UserResponse } from '../types/types';

export const getUser = (): UserResponse | null => {
	const data = localStorage.getItem('user');
	if (data) {
		return JSON.parse(data);
	}
	return null;
};
