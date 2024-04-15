import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserService } from '../services/UserService/UserService';
import { ProtectedUser } from '../services/UserService/types';
import { useAuthContext } from './useAuthContext';
import { logoutSuccess } from '../reducer/authReducer/actionCreators';

export const useUsers = (): {
	users: ProtectedUser[];
	getUsers: () => void;
} => {
	const [users, setUsers] = useState<ProtectedUser[]>([]);
	const { dispatch } = useAuthContext();
	const navigate = useNavigate();

	const getUsers = async () => {
		setUsers([]);
		const response = await UserService.getUsers();

		if (response == null) {
			dispatch(logoutSuccess());
			localStorage.removeItem('user');
			localStorage.removeItem('accessToken');
			navigate('sign-in', { replace: true });
		} else {
			setUsers(response.data);
		}
	};

	return { users, getUsers };
};
