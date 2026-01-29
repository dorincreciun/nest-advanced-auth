type NodeEnvType = 'development' | 'production'

export interface EnvironmentVariables {

    /* NEST JS */
    NODE_ENV: NodeEnvType;
    PORT: number;


    /* DATABASE */
    DB_HOST: string,
    DB_PORT: number
    DB_USER: string,
    DB_NAME: string,
    DB_PASS: string,
}