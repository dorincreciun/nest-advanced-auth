export interface CreateSessionParams {
	user_id: string;
	user_agent: string;
	ip_address: string;
	token_hash: string;
	expires_at: Date;
}