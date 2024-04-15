import { NextFunction, Request, Response } from 'express';

import { Forbidden } from '../exceptions/apiError.js';
import { AuthService } from '../services/index.js';

export class AuthController {
	public static async register(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			const { userDto, accessToken, refreshToken } = await AuthService.register(
				req.payload,
				req.fingerprint.hash
			);

			res.cookie('refresh', refreshToken, {
				httpOnly: true,
			});

			res.status(201).send({
				data: {
					user: userDto,
					accessToken,
				},
			});
		} catch (error: unknown) {
			next(error);
		}
	}

	public static async login(req: Request, res: Response, next: NextFunction) {
		try {
			const { userDto, accessToken, refreshToken } = await AuthService.login(
				req.payload,
				req.fingerprint.hash
			);

			res.cookie('refresh', refreshToken, {
				httpOnly: true,
			});
			res.status(200).send({
				data: {
					user: userDto,
					accessToken,
				},
			});
		} catch (error: unknown) {
			const err = error as Error;
			next(err);
		}
	}

	public static async logout(req: Request, res: Response, next: NextFunction) {
		try {
			const { refresh: refreshToken } = req.cookies;

			if (!refreshToken) {
				throw new Forbidden('Accesses denied');
			}

			await AuthService.logout(refreshToken, req.fingerprint.hash);

			res.clearCookie('refresh');
			res.status(200).end();
		} catch (error: unknown) {
			next(error);
		}
	}

	public static async refresh(req: Request, res: Response, next: NextFunction) {
		try {
			const { refresh } = req.cookies;

			if (!refresh) {
				throw new Forbidden('Accesses denied');
			}

			const { accessToken, refreshToken } = await AuthService.refresh(
				refresh,
				req.fingerprint.hash
			);
			res.cookie('refresh', refreshToken, {
				httpOnly: true,
			});
			res.status(202).send({ token: accessToken });
		} catch (error: unknown) {
			next(error);
		}
	}
}
