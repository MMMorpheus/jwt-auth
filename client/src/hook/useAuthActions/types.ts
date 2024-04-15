import { AxiosResponse } from 'axios';

import type { ErrorState } from '../../reducer/authReducer/types';
import type { AuthResponse } from '../../services/AuthService/types';
import type { LoginInput, RegisterInput } from '../../utils/validationSchemas';

type AuthAction<T> = (credentials: T) => Promise<void>;

export type LoginAction = AuthAction<LoginInput>;

export type RegisterAction = AuthAction<RegisterInput>;

export type UseAuthActions = () => {
	login: LoginAction;
	register: RegisterAction;
	logout: () => Promise<void>;
};

export const isAuthResponse = (
	response: AxiosResponse<AuthResponse> | ErrorState
): response is AxiosResponse<AuthResponse> => {
	if (response) {
		return 'data' in response && 'data' in response.data;
	}
	return false;
};
export const isAuthError = (
	response: AxiosResponse<AuthResponse> | ErrorState | void
): response is ErrorState => {
	if (response) {
		return (
			'message' in response && 'status' in response && 'statusText' in response
		);
	}
	return false;
};
