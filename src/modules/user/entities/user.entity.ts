export class UserEntity {
	id: string;
	email: string;
	password_hash: string;
	activation_code: string | null;
	is_active: boolean;
	is_verified: boolean;
	created_at: Date;
	updated_at: Date;
}
