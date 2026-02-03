import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/service/database.service';
import { CreateSessionParams } from '../interface/session.interface';
import { SessionEntity } from '../entities/session.entity';

@Injectable()
export class SessionRepository {
	constructor(
		private readonly databaseService: DatabaseService
	) {}

	async create(params: CreateSessionParams): Promise<SessionEntity> {
		const query = `
			INSERT INTO sessions (user_id, user_agent, ip_address, token_hash, expires_at)
			VALUES ($1, $2, $3, $4, $5)
			RETURNING *
		`

		const queryParams = [
			params.user_id,
			params.user_agent,
			params.ip_address,
			params.token_hash,
			params.expires_at
		]

		return await this.databaseService.findOneOrFail<SessionEntity>(query, queryParams);
	}
}
