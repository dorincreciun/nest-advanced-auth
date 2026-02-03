import { RegisterDto } from '../dto/register.dto';

export interface RegisterParams {
	dto: RegisterDto;
	metadata: {
		ip_address: string;
		user_agent: string;
	}
}