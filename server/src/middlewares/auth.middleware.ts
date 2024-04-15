import { RequestHandler } from 'express';

import { TokenService, UserService } from '../services/index.js';
import { Forbidden, Unauthorized } from '../exceptions/apiError.js';
import { config } from '../config/index.js';

export const authenticateRequest: RequestHandler = async (req, res, next) => {
	try {
		const { authorization } = req.headers;

		if (!authorization) {
			throw new Unauthorized('Authentication required');
		}

		// Extract the token itself without Bearer keyword
		const token = authorization.split(' ')[1];

		if (!token) {
			throw new Unauthorized('Authentication required');
		}

		const userDto = TokenService.verifyToken(token, config.ACCESS_TOKEN_SECRET);

		if (!userDto) {
			throw new Unauthorized('Authentication required');
		}

		const user = await UserService.findByEmail(userDto.email);

		if (!user) {
			throw new Unauthorized('Authentication required');
		} else {
			next();
		}
	} catch (error: unknown) {
		const err = error as Error;

		next(err);
	}
};
