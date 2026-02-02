import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { ConfirmRegistrationDto } from '../dto/confirm-registration.dto';

@Controller('user')
export class UserController {
	@Post('confirm-registration')
	confirmRegistration(@Body() dto: ConfirmRegistrationDto) {}

	@Get('me')
	getProfile() {}

	@Patch('me')
	updateProfile() {}
}
