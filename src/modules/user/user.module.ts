import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { UserRepository } from './repository/user.repository';

@Module({
	providers: [UserService, UserRepository],
	exports: [UserService],
	controllers: [UserController],
})
export class UserModule {}
