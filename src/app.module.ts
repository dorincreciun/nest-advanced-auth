import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import Joi from "joi";

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
            }),
            validationOptions: {
                allowUnknown: true,
                abortEarly: true,
            },
        }),
    ]
})

export class AppModule {}