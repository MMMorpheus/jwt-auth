import { RefreshSession } from '@prisma/client';
import jwt from 'jsonwebtoken';

import { config } from '../config/index.js';
import { db } from '../db/index.js';
import { UserDTO } from '../dtos/UserDTOs.js';
import { ServerError } from '../exceptions/apiError.js';
import { countExpirationTimestamp } from '../utils/expirationCounter.js';

type GenerateTokens = (payload: UserDTO) => {
	accessToken: string;
	refreshToken: string;
	expirationDate: string;
};
type SaveRefreshToken = (
	userId: number,
	fingerprint: string,
	refreshToken: string,
	expiresAt: string
) => Promise<RefreshSession>;
type VerifyToken = (token: string, secret: string) => UserDTO | null;
type DeleteSession = (
	token: string,
	fingerprint: string
) => Promise<RefreshSession | null>;
type FindSessionById = (id: number) => Promise<RefreshSession | null>;

export class TokenService {
	public static generateTokens: GenerateTokens = (payload) => {
		const accessToken = jwt.sign({ ...payload }, config.ACCESS_TOKEN_SECRET, {
			expiresIn: `${config.ACCESS_TOKEN_EXPIRATION}s`,
		});
		const refreshToken = jwt.sign({ ...payload }, config.REFRESH_TOKEN_SECRET, {
			expiresIn: `${config.REFRESH_TOKEN_EXPIRATION}s`,
		});
		const expirationDate = countExpirationTimestamp();

		return { accessToken, refreshToken, expirationDate };
	};

	public static saveRefreshToken: SaveRefreshToken = async (
		userId,
		fingerprint,
		refreshToken,
		expiresAt
	) => {
		try {
			return db.$transaction(async (tx) => {
				const existingSessions = await tx.refreshSession.findMany({
					where: { userId },
					orderBy: { createdAt: 'asc' },
				});

				if (existingSessions.length === config.MAX_AVAILABLE_SESSIONS) {
					const [oldestSession] = existingSessions;
					await tx.refreshSession.delete({
						where: {
							token_fingerprint: {
								token: oldestSession.token,
								fingerprint: oldestSession.fingerprint,
							},
						},
					});
				}

				return await tx.refreshSession.create({
					data: {
						userId,
						token: refreshToken,
						fingerprint,
						expiresAt,
					},
				});
			});
		} catch (error: unknown) {
			const err = error as Error;
			throw new ServerError(err.stack);
		}
	};

	public static verifyToken: VerifyToken = (token, secret) => {
		try {
			const userData = jwt.verify(token, secret);

			if (typeof userData === 'string') {
				return null;
			}

			return new UserDTO(userData);
		} catch (error: unknown) {
			return null;
		}
	};

	public static findAndDeleteSession: DeleteSession = async (
		token,
		fingerprint
	) => {
		const existingSession = db.refreshSession.findUnique({
			where: {
				token_fingerprint: {
					token,
					fingerprint,
				},
			},
		});

		if (!existingSession) {
			return null;
		}

		return await db.refreshSession.delete({
			where: {
				token_fingerprint: {
					token,
					fingerprint,
				},
			},
		});
	};

	public static findSessionById: FindSessionById = async (userId) => {
		const session = await db.refreshSession.findFirst({
			where: {
				userId,
			},
		});

		if (!session) {
			return null;
		}

		return session;
	};
}
