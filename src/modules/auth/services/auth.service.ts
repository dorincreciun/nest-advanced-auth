import { ConflictException, Injectable } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { SessionService } from '../../session/services/session.service';
import { RegisterDto } from '../dto/register.dto';
import { EX_MESSAGES } from '../../../common/constants/exception-messages.constants';
import * as bcrypt from 'bcrypt';
import { randomInt } from 'node:crypto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly mailerService: MailerService,
	) {}

	async register(dto: RegisterDto) {
		const { email, password } = dto;

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
		//    - hash-ul parolei
		//    - codul de activare
		//    - is_active: false (contul este blocat până la verificare)
		const newUser = this.userService.create({
			email,
			password_hash,
			activation_code,
		});

		// 6. Trimite email-ul de verificare cu codul generat
		//    (Aici decidem: dacă email-ul eșuează, ce facem cu userul salvat?)
		this.mailerService
			.sendMail({
				to: email,
				subject: 'Codul tau de activare',
				template: 'activation',
				context: {
					activation_code: activation_code.split('').join('-'),
				},
			})
			.catch((err) => {
				console.error(
					`Eroare la trimiterea email-ului către ${email}:`,
					err,
				);
			});

		// 7. Returnăm un mesaj de succes către client (fără token-uri încă!)
		return { message: 'Cont creat. Verifică email-ul pentru activare.' };
	}
}
