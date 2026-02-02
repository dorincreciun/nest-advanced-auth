import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { VAL_MESSAGES } from '../../../common/constants/validation-messages.constants';

export class ConfirmRegistrationDto {
	@IsNotEmpty({ message: VAL_MESSAGES.USER.CONFIRMATION_CODE_REQUIRED })
	@IsString({ message: VAL_MESSAGES.USER.CONFIRMATION_CODE_IS_STRING })
	@Length(6, 6, {
		message: VAL_MESSAGES.USER.CONFIRMATION_CODE_LENGTH,
	})
	@Matches(/^\d{6}$/, { message: VAL_MESSAGES.USER.CONFIRMATION_CODE_DIGITS })
	activation_code: string;
}