import { useNavigate } from 'react-router-dom';

import {
	loginError,
	loginSuccess,
	logoutError,
	logoutSuccess,
	registerError,
	registerSuccess,
} from '../../reducer/authReducer/actionCreators';
import { AuthService } from '../../services/AuthService/AuthService';
import { useAuthContext } from '../useAuthContext';
import {
	LoginAction,
	RegisterAction,
	UseAuthActions,
	isAuthError,
	isAuthResponse,
} from './types';

export const useAuthActions: UseAuthActions = () => {
	const navigate = useNavigate();
	const { dispatch } = useAuthContext();

	const login: LoginAction = async (credentials) => {
		const response = await AuthService.login(credentials);

		if (isAuthResponse(response)) {
			const { user, accessToken } = response.data.data;

			dispatch(loginSuccess(user));

			localStorage.setItem('user', JSON.stringify(user));
			localStorage.setItem('accessToken', accessToken);

			navigate('/', { replace: true });
		}
		if (isAuthError(response)) {
			dispatch(loginError(response));
		}
	};

	const register: RegisterAction = async (credentials) => {
		const response = await AuthService.register(credentials);

		if (isAuthResponse(response)) {
			const { user, accessToken } = response.data.data;
			dispatch(registerSuccess(user));

			localStorage.setItem('user', JSON.stringify(user));
			localStorage.setItem('accessToken', accessToken);

			navigate('/', { replace: true });
		}
		if (isAuthError(response)) {
			dispatch(registerError(response));
		}
	};

	const logout = async () => {
		const response = await AuthService.logout();

		if (isAuthError(response)) {
			dispatch(logoutError(response));
		}

		localStorage.removeItem('user');
		localStorage.removeItem('accessToken');

		dispatch(logoutSuccess());
		navigate('/sign-in', { replace: true });
	};

	return { login, register, logout };
};
