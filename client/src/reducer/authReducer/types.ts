import actionTypes from './actionTypes';

import type { UserData } from '../../services/AuthService/types';

type FetchStatus = 'pending' | 'fulfilled' | 'rejected';

export type ErrorState = {
	status: number | 'Unhandled status';
	statusText: string;
	message: string;
};

export type UserState = {
	user: UserData | null;
	error: ErrorState | null;
	status: FetchStatus;
};

export type ActionType = keyof typeof actionTypes;

export type ActionPayload<T extends ActionType> = T extends
	| 'LOGIN_SUCCESS'
	| 'REGISTER_SUCCESS'
	? UserData
	: T extends 'LOGIN_ERROR' | 'REGISTER_ERROR' | 'LOGOUT_ERROR'
	? ErrorState
	: void;

export type Action<T extends ActionType> = { type: T } & (T extends ActionType
	? { payload: ActionPayload<T> }
	: void);

export type ActionCreator<T extends ActionType> = (
	payload: ActionPayload<T>
) => Action<T>;
