import { config } from '../config/index.js';
import { CreateUserDTO, UserDTO } from '../dtos/UserDTOs.js';
import { BadRequest, Forbidden, Unauthorized } from '../exceptions/apiError.js';
import {
	CreateUserRequest,
	LoginUserRequest,
} from '../utils/validationSchemas.js';
import { TokenService, UserService } from './index.js';

type HandleTokens = (
	userDto: UserDTO,
	fingerprint: string
) => Promise<{ userDto: UserDTO; accessToken: string; refreshToken: string }>;
type TokensPayload = ReturnType<HandleTokens>;
type Register = (
	credentials: CreateUserRequest,
	fingerprint: string
) => TokensPayload;
type Login = (
	credentials: LoginUserRequest,
	fingerprint: string
) => TokensPayload;
type Refresh = (refreshToken: string, fingerprint: string) => TokensPayload;
type Logout = (refreshToken: string, fingerprint: string) => Promise<void>;

export class AuthService {
	private static handleTokens: HandleTokens = async (userDto, fingerprint) => {
		const { accessToken, refreshToken, expirationDate } =
			TokenService.generateTokens(userDto);

		await TokenService.saveRefreshToken(
			userDto.id,
			fingerprint,
			refreshToken,
			expirationDate
		);

		return { userDto, accessToken, refreshToken };
	};

	public static register: Register = async (credentials, fingerprint) => {
		const userData = new CreateUserDTO(credentials);

		const user = await UserService.create(userData);

		return await this.handleTokens(new UserDTO(user), fingerprint);
	};

	public static login: Login = async ({ email, password }, fingerprint) => {
		const user = await UserService.findByEmail(email);

		if (!user) {
			throw new BadRequest(
				'Invalid credentials. Please check the entered information and try again.'
			);
		}

		const match = await UserService.checkPass(password, user.passwordHash);

		if (!match) {
			throw new BadRequest(
				'Invalid credentials. Please check the entered information and try again.'
			);
		}

		return await this.handleTokens(new UserDTO(user), fingerprint);
	};

	public static logout: Logout = async (refreshToken, fingerprint) => {
		const deletedSession = await TokenService.findAndDeleteSession(
			refreshToken,
			fingerprint
		);

		if (!deletedSession) {
			throw new Forbidden('Access denied');
		}
	};

	public static refresh: Refresh = async (refreshToken, fingerprint) => {
		const deletedSession = await TokenService.findAndDeleteSession(
			refreshToken,
			fingerprint
		);

		if (!deletedSession) {
			throw new Unauthorized('Authorization required');
		}

		const userPayload = TokenService.verifyToken(
			deletedSession.token,
			config.REFRESH_TOKEN_SECRET
		);

		if (!userPayload) {
			throw new Unauthorized('Authorization required');
		}

		if (fingerprint !== deletedSession.fingerprint) {
			throw new Unauthorized('Authorization required');
		}

		return await this.handleTokens(userPayload, fingerprint);
	};
}
