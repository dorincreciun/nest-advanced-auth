export class SessionEntity {
	id: string;
	user_id: string;
	user_agent: string;
	ip_address: string;
	expires_at: Date;
	created_at: Date;
}
