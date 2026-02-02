/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
	pgm.sql(`
		CREATE TABLE sessions
		(
			id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
			user_id UUID NOT NULL,
			user_agent TEXT,
			ip_address INET,
			expires_at TIMESTAMPTZ NOT NULL,
			create_at TIMESTAMP WITH TIME ZONE DEFAULT now(),

			CONSTRAINT fk_user
				FOREIGN KEY(user_id)
					REFERENCES users(id)
					ON DELETE CASCADE
		);

		CREATE INDEX idx_sessions_user_id ON sessions(user_id);
	`);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
	pgm.sql(`
    DROP INDEX IF EXISTS idx_sessions_user_id;
    DROP TABLE IF EXISTS sessions;
  `);
};
