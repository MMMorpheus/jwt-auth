import actionTypes from './actionTypes';
import type { ActionCreator } from './types';

const {
	LOGIN_SUCCESS,
	LOGIN_ERROR,
	REGISTER_SUCCESS,
	REGISTER_ERROR,
	LOGOUT_SUCCESS,
	LOGOUT_ERROR,
} = actionTypes;

export const loginSuccess: ActionCreator<typeof LOGIN_SUCCESS> = (payload) => {
	return {
		type: LOGIN_SUCCESS,
		payload,
	};
};
export const loginError: ActionCreator<typeof LOGIN_ERROR> = (payload) => {
	return {
		type: LOGIN_ERROR,
		payload,
	};
};
export const registerSuccess: ActionCreator<typeof REGISTER_SUCCESS> = (
	payload
) => {
	return {
		type: REGISTER_SUCCESS,
		payload,
	};
};
export const registerError: ActionCreator<typeof REGISTER_ERROR> = (
	payload
) => {
	return {
		type: REGISTER_ERROR,
		payload,
	};
};
export const logoutSuccess: ActionCreator<typeof LOGOUT_SUCCESS> = (
	payload
) => {
	return {
		type: LOGOUT_SUCCESS,
		payload,
	};
};
export const logoutError: ActionCreator<typeof LOGOUT_ERROR> = (payload) => {
	return {
		type: LOGOUT_ERROR,
		payload,
	};
};
