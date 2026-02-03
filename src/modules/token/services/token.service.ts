import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import ms, { StringValue } from 'ms';
import {
	GeneratedToken,
	GenerateTokensResponse,
	TokenPayload,
} from '../interface/token.interface';
import { EnvironmentVariables } from '../../../common/types/environment-variables.types';
import { TokenType } from '../enums/token.enum';
import { EX_MESSAGES } from '../../../common/constants/exception-messages.constants';

@Injectable()
export class TokenService {
	constructor(
		private readonly configService: ConfigService<EnvironmentVariables>,
		private readonly jwtService: JwtService,
	) {}

	async generateTokens(
		payload: TokenPayload,
	): Promise<GenerateTokensResponse> {
		const [accessToken, refreshToken] = await Promise.all([
			this.generateToken(payload, TokenType.ACCESS),
			this.generateToken(payload, TokenType.REFRESH),
		]);

		return [accessToken, refreshToken];
	}

	private async generateToken(
		payload: TokenPayload,
		type: TokenType,
	): Promise<GeneratedToken> {
		try {
			const secret = this.configService.getOrThrow<string>(
				`JWT_${type}_SECRET`,
			);
			const expiresInput = this.configService.getOrThrow<string>(
				`JWT_${type}_EXPIRES_IN`,
			);

			const msDuration = ms(expiresInput as StringValue);

			const expiresAtDate = new Date(Date.now() + msDuration);

			const token = await this.jwtService.signAsync(payload, {
				secret,
				expiresIn: msDuration / 1000,
			});

			return {
				token,
				expires_at: expiresAtDate,
			};
		} catch (e) {
			throw new InternalServerErrorException(
				EX_MESSAGES.SERVER.INTERNAL_ERROR,
			);
		}
	}
}
