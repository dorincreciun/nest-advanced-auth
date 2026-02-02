import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/service/database.service';
import { UserEntity } from '../entities/user.entity';
import { CreateUser } from '../interfaces/user.interface';

@Injectable()
export class UserRepository {
	constructor(private readonly databaseService: DatabaseService) {}

	async findByEmail(email: string): Promise<UserEntity | null> {
		const query = `
			SELECT * FROM users
			WHERE email = $1
		`;
		return await this.databaseService.findOneOrNull<UserEntity>(query, [
			email,
		]);
	}

	async create(data: CreateUser): Promise<UserEntity> {
		const query = `
			INSERT INTO users (email, password_hash, activation_code)
			VALUES ($1, $2, $3)
			RETURNING *
		`;

		const params = [data.email, data.password_hash, data.activation_code];

		return await this.databaseService.findOneOrFail<UserEntity>(
			query,
			params,
		);
	}
}
