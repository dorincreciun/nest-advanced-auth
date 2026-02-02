import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { UserEntity } from '../entities/user.entity';
import { CreateUser } from '../interfaces/user.interface';

@Injectable()
export class UserService {
	constructor(private readonly userRepository: UserRepository) {}

	findByEmail(email: string): Promise<UserEntity | null> {
		return this.userRepository.findByEmail(email);
	}

	create(data: CreateUser): Promise<UserEntity> {
		return this.userRepository.create(data)
	}
}
