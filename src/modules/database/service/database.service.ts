import {
	Inject,
	Injectable,
	InternalServerErrorException,
} from '@nestjs/common';
import { PG_CONNECTION } from '../../../common/constants/providers-keys.constants';
import { Pool, QueryResultRow } from 'pg';
import { EX_MESSAGES } from '../../../common/constants/exception-messages.constants';

@Injectable()
export class DatabaseService {
	constructor(@Inject(PG_CONNECTION) private readonly db: Pool) {}

	private async executeQuery<T extends QueryResultRow>(
		query: string,
		params: unknown[],
	): Promise<T[]> {
		try {
			const result = await this.db.query<T>(query, params);
			return result.rows;
		} catch (e) {
			console.error('Database Error:', e);
			throw new InternalServerErrorException(
				EX_MESSAGES.DATABASE.QUERY_ERROR,
			);
		}
	}

	async findMany<T extends QueryResultRow>(
		query: string,
		params: unknown[],
	): Promise<T[]> {
		return this.executeQuery<T>(query, params);
	}

	async findOneOrNull<T extends QueryResultRow>(
		query: string,
		params: unknown[],
	): Promise<T | null> {
		const rows = await this.executeQuery<T>(query, params);
		return rows.length > 0 ? rows[0] : null;
	}

	async findOneOrFail<T extends QueryResultRow>(
		query: string,
		params: unknown[],
	): Promise<T> {
		const row = await this.findOneOrNull<T>(query, params);
		if (!row) {
			throw new InternalServerErrorException(EX_MESSAGES.DATABASE.NOT_FOUND);
		}
		return row;
	}
}
