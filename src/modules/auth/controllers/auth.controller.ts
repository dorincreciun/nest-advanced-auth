import { Body, Controller, Post, Req } from '@nestjs/common';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { AuthService } from '../services/auth.service';
import type { Request } from 'express';
import { RegisterParams } from '../interfaces/auth.interface';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	async register(@Req() request: Request, @Body() registerDto: RegisterDto) {

		const user_ip = request.ip;
		const user_agent = request.headers['user-agent'];

		const registerParams: RegisterParams = {
			dto: registerDto,
			metadata: {
				ip_address: request.ip ?? '0.0.0.0',
				user_agent: request.headers['user-agent'] ?? 'unknown',
			},
		};

		return await this.authService.register(registerParams);
	}

	@Post('login')
	login(@Body() loginDto: LoginDto) {}
}
