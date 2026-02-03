import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UserModule } from '../user/user.module';
import { SessionModule } from '../session/session.module';
import { TokenModule } from '../token/token.module';

@Module({
	imports: [UserModule, SessionModule, TokenModule],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
