import { Module } from '@nestjs/common';
import { SessionService } from './services/session.service';
import { SessionController } from './controllers/session.controller';

@Module({
	providers: [SessionService],
	exports: [SessionService],
	controllers: [SessionController],
})
export class SessionModule {}
