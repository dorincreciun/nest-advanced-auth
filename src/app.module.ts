import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { SessionModule } from './modules/session/session.module';
import { AuthModule } from './modules/auth/auth.module';
import Joi from 'joi';
import { MailerModule } from '@nestjs-modules/mailer';
import { async } from 'rxjs';
import { EnvironmentVariables } from './common/types/environment-variables.types';
import { DatabaseModule } from './modules/database/database.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			validationSchema: Joi.object({
				/* NEST JS */
				NODE_ENV: Joi.string().required(),
				PORT: Joi.number().required(),

				/* DATABASE */
				DB_HOST: Joi.string().required(),
				DB_PORT: Joi.number().required(),
				DB_USER: Joi.string().required(),
				DB_NAME: Joi.string().required(),
				DB_PASS: Joi.string().required(),

				/* MAIL */
				MAIL_HOST: Joi.string().required(),
				MAIL_PORT: Joi.number().required(),
				MAIL_USER: Joi.string().required(),
				MAIL_PASS: Joi.string().required(),
				MAIL_FROM: Joi.string().required(),
			}),
			validationOptions: {
				allowUnknown: true,
				abortEarly: true,
			},
		}),
		MailerModule.forRootAsync({
			inject: [ConfigService],
			useFactory: async (
				configService: ConfigService<EnvironmentVariables>,
			) => ({
				transport: {
					host: configService.get('MAIL_HOST'),
					port: configService.get('MAIL_PORT'),
					auth: {
						user: configService.get('MAIL_USER'),
						pass: configService.get('MAIL_PASS'),
					},
				},
				defaults: {
					from: configService.get('MAIL_FROM'),
				},
			}),
		}),
		DatabaseModule,
		UserModule,
		SessionModule,
		AuthModule,
	],
})
export class AppModule {}
