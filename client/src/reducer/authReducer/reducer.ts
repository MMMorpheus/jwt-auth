import { getUser } from '../../utils/getUser';
import actionTypes from './actionTypes';
import type { UserState, Action, ActionType, ActionPayload } from './types';

const {
	LOGIN_SUCCESS,
	LOGIN_ERROR,
	REGISTER_SUCCESS,
	REGISTER_ERROR,
	LOGOUT_SUCCESS,
	LOGOUT_ERROR,
} = actionTypes;

export const initialState: UserState = {
	user: getUser(),
	error: null,
	status: getUser() ? 'fulfilled' : 'pending',
};

export const authReducer = (
	state: UserState,
	{ type, payload }: Action<ActionType>
): UserState => {
	switch (type) {
		case LOGIN_SUCCESS:
		case REGISTER_SUCCESS:
			return {
				error: null,
				user: payload as ActionPayload<typeof type>,
				status: 'fulfilled',
			};
		case LOGIN_ERROR:
		case REGISTER_ERROR:
		case LOGOUT_ERROR:
			return {
				...state,
				error: payload as ActionPayload<typeof type>,
				status: 'rejected',
			};
		case LOGOUT_SUCCESS:
			return initialState;
		default:
			return state;
	}
};
