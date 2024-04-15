import { appClient } from '../../http/appClient';
import type { GetUsers, ProtectedUserResponse } from './types';

export class UserService {
	public static getUsers: GetUsers = async () => {
		try {
			const { data } = await appClient.get<ProtectedUserResponse>('/users');
			return data;
		} catch (error: unknown) {
			return null;
		}
	};
}
