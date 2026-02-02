import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UserModule } from '../user/user.module';
import { SessionModule } from '../session/session.module';

@Module({
	imports: [UserModule, SessionModule],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
