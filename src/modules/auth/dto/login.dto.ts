import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { VAL_MESSAGES } from '../../../common/constants/validation-messages.constants';

export class LoginDto {
	@IsNotEmpty({ message: VAL_MESSAGES.AUTH.EMAIL_REQUIRED })
	@IsEmail({}, { message: VAL_MESSAGES.AUTH.EMAIL_INVALID })
	email: string;

	@IsNotEmpty({ message: VAL_MESSAGES.AUTH.PASSWORD_REQUIRED })
	@IsString({ message: VAL_MESSAGES.AUTH.PASSWORD_IS_STRING })
	@MinLength(8, { message: VAL_MESSAGES.AUTH.PASSWORD_MIN_LENGTH })
	password: string;
}