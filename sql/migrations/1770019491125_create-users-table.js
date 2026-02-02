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
    CREATE TABLE users
    (
      id              UUID PRIMARY KEY         DEFAULT gen_random_uuid(),
      email           VARCHAR(150) UNIQUE NOT NULL,
      password_hash   VARCHAR(255)        NOT NULL,
      activation_code INTEGER                  DEFAULT NULL,
      is_active       BOOLEAN                  DEFAULT FALSE,
      is_verified     BOOLEAN                  DEFAULT FALSE,
      created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `);

  pgm.sql(`
    CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $$
    BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
    END;
    $$ language 'plpgsql';
  `);

  pgm.sql(`
    CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();
  `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.sql(`
    DROP TABLE users;
  `)
};
