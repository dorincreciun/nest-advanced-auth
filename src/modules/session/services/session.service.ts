import { Injectable } from '@nestjs/common';
import { CreateSessionParams } from '../interface/session.interface';
import { SessionRepository } from '../repository/session.repository';
import { SessionEntity } from '../entities/session.entity';

@Injectable()
export class SessionService {
	constructor(private readonly sessionRepository: SessionRepository) {}

	create(params: CreateSessionParams): Promise<SessionEntity> {
		return this.sessionRepository.create(params)
	}
}
