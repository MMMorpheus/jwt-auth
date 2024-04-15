import axios, { isAxiosError } from 'axios';

import { constants } from '../../constants';
import { AuthService } from '../../services/AuthService/AuthService';

export const appClient = axios.create({
	baseURL: constants.API_BASE_URL,
	withCredentials: true,
});

appClient.interceptors.request.use((requestConfig) => {
	const accessToken = localStorage.getItem('accessToken');
	if (accessToken) {
		requestConfig.headers.Authorization = `Bearer ${accessToken}`;
	}
	return requestConfig;
});

appClient.interceptors.response.use(
	(response) => response,
	async (error: unknown) => {
		if (isAxiosError(error) && error.response && error.config) {
			const { status } = error.response;
			const { config: requestConfig } = error;

			let isIntercepted = false;

			if (status == 401 && !isIntercepted) {
				try {
					const response = await AuthService.refresh();

					if (response) {
						isIntercepted = true;

						localStorage.setItem('accessToken', response.token);
						return appClient(requestConfig);
					}
				} catch (error) {
					Promise.reject(error);
				}
			}
		}
		Promise.reject(error);
	}
);
