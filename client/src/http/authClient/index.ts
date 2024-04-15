import axios from 'axios';

import { constants } from '../../constants';

export const authClient = axios.create({
	baseURL: constants.API_BASE_URL,
	withCredentials: true,
});

// authClient.interceptors.request.use((requestConfig) => {
// 	requestConfig.headers.Authorization = `Bearer ${localStorage.getItem(
// 		'accessToken'
// 	)}`;
// 	return requestConfig;
// });

// authClient.interceptors.response.use(
// 	(response) => {
// 		return response;
// 	},
// 	async (error: unknown) => {
// 		if (error instanceof AxiosError) {
// 			const origin = error.config;

// 			let isIntercepted = false;

// 			if (error.response?.status == 401 && origin && !isIntercepted) {
// 				try {
// 					const response = await AuthService.refresh();
// 					const { token } = response;
// 					localStorage.setItem('accessToken', token);

// 					authClient.request(origin);
// 					isIntercepted = true;
// 				} catch (error: unknown) {
// 					if (error instanceof AxiosError) {
// 						console.log(
// 							`Error ${error?.response?.status}: ${error?.response?.statusText}`
// 						);
// 					}
// 				}
// 			}
// 		} else {
// 			throw error;
// 		}
// 	}
// );
