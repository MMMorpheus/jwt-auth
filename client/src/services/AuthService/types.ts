import { AxiosResponse } from 'axios';

import { ErrorState } from '../../reducer/authReducer/types';
import { LoginInput, RegisterInput } from '../../utils/validationSchemas';

type UserRole = 'admin' | 'user';

export type UserData = {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	avatarUrl: string | null;
	role: UserRole;
	isActivated: boolean;
};

export type TokenResponse = {
	token: string;
};

export type AuthResponse = {
	data: {
		user: UserData;
		accessToken: string;
	};
};

export type AuthError = {
	message: string;
	errors: [];
};

export type Login = (
	credentials: LoginInput
) => Promise<AxiosResponse<AuthResponse> | ErrorState>;

export type Logout = () => Promise<void | ErrorState>;

export type Register = (
	credentials: RegisterInput
) => Promise<AxiosResponse<AuthResponse> | ErrorState>;

export type Refresh = () => Promise<TokenResponse | null>;

export type HandleError = (error: unknown) => ErrorState;
