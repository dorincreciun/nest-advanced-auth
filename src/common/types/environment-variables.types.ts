type NodeEnvType = 'development' | 'production' | 'test';

export interface EnvironmentVariables {
	/* NEST JS */
	NODE_ENV: NodeEnvType;
	PORT: number;

	/* DATABASE */
	DB_HOST: string;
	DB_PORT: number;
	DB_USER: string;
	DB_NAME: string;
	DB_PASS: string;

	DATABASE_URL: string;

	/* MAIL */
	MAIL_HOST: string;
	MAIL_PORT: number;
	MAIL_USER: string;
	MAIL_PASS: string;
	MAIL_FROM: string;
}
