import axios, { isAxiosError } from 'axios';

import { constants } from '../../constants';
import { authClient } from '../../http/authClient';
import type {
	AuthError,
	HandleError,
	Login,
	Logout,
	Refresh,
	Register,
	TokenResponse,
} from './types';

export class AuthService {
	private static handleError: HandleError = (error) => {
		if (isAxiosError<AuthError>(error) && error.response) {
			return {
				status: error.response.status,
				statusText: error.response.statusText,
				message: error.response.data.message,
			};
		} else {
			return {
				status: 'Unhandled status',
				statusText: 'Unhandled statusText',
				message:
					error instanceof Error ? error.message : 'Unexpected unhandled error',
			};
		}
	};

	public static login: Login = async (credentials) => {
		try {
			return await authClient.post('/login', credentials);
		} catch (error: unknown) {
			return this.handleError(error);
		}
	};

	public static logout: Logout = async () => {
		try {
			return await authClient.get('/logout');
		} catch (error) {
			return this.handleError(error);
		}
	};

	public static register: Register = async (credentials) => {
		try {
			return await authClient.post('/register', credentials);
		} catch (error) {
			return this.handleError(error);
		}
	};

	public static refresh: Refresh = async () => {
		try {
			const { data } = await axios.get<TokenResponse>(
				`${constants.API_BASE_URL}/refresh`,
				{
					withCredentials: true,
				}
			);

			return data;
		} catch (error: unknown) {
			return null;
		}
	};
}
