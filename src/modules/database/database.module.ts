import {Global, Module} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {EnvironmentVariables} from "../../common/types/environment-variables.types";
import {Pool} from "pg";
import {PG_CONNECTION} from "../../common/constants/providers-keys.constants";
import { DatabaseService } from './service/database.service';

@Global()
@Module({
    providers: [
        {
            provide: PG_CONNECTION,
            inject: [ConfigService],
            useFactory: async (configService: ConfigService<EnvironmentVariables>) => {
                return new Pool({
                    host: configService.get('DB_HOST'),
                    port: configService.get('DB_PORT'),
                    user: configService.get('DB_USER'),
                    database: configService.get('DB_NAME'),
                    password: configService.get('DB_PASS'),
                })
            }
        },
		DatabaseService,
    ],
    exports: [
		PG_CONNECTION,
		DatabaseService
	],
})

export class DatabaseModule {}