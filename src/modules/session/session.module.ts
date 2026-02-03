import { Module } from '@nestjs/common';
import { SessionService } from './services/session.service';
import { SessionController } from './controllers/session.controller';
import { SessionRepository } from './repository/session.repository';

@Module({
	providers: [SessionService, SessionRepository],
	exports: [SessionService],
	controllers: [SessionController],
})
export class SessionModule {}
