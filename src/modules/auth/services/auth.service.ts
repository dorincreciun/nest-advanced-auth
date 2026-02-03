import { ConflictException, Injectable } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { RegisterDto } from '../dto/register.dto';
import { EX_MESSAGES } from '../../../common/constants/exception-messages.constants';
import * as bcrypt from 'bcrypt';
import { randomInt } from 'node:crypto';
import { TokenService } from '../../token/services/token.service';
import { RegisterParams } from '../interfaces/auth.interface';
import { SessionService } from '../../session/services/session.service';
import { CreateSessionParams } from '../../session/interface/session.interface';

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly tokenService: TokenService,
		private readonly sessionService: SessionService,
	) {}

	async register(data: RegisterParams) {
		const { email, password } = data.dto;

		// 1. Căutăm dacă un email de tipul dat a fost înregistrat sau nu
		const existingUser = await this.userService.findByEmail(email);

		// 2. Dacă da, aruncăm o excepție (ConflictException) către client deoarece email-ul este deja folosit
		if (existingUser) {
			throw new ConflictException(EX_MESSAGES.AUTH.EMAIL_ALREADY_EXISTS);
		}

		// 3. Dacă nu e înregistrat, cu bcrypt transformăm parola într-un hash (securizare)
		const password_hash = await bcrypt.hash(password, 10);

		// 4. Generăm un activation_code (cod de 6 cifre)
		const activation_code = randomInt(100000, 1000000).toString();

		// 5. Salvează noul utilizator în baza de date cu:
		const newUser = await this.userService.create({
			email,
			password_hash,
			activation_code,
		});

		// 6. Generam acces si refresh token
		const [accessToken, refreshToken] =
			await this.tokenService.generateTokens({ sub: newUser.id });

		const token_hash = await bcrypt.hash(refreshToken.token, 10)

		// 7. Creiem sesiunea utilizatorului
		const session = await this.sessionService.create({
			user_id: newUser.id,
			user_agent: data.metadata.user_agent,
			ip_address: data.metadata.ip_address,
			token_hash: token_hash,
			expires_at: refreshToken.expires_at
		});
	}
}
