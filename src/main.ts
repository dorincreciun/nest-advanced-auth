import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {EnvironmentVariables} from "./common/types/environment-variables.types";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService<EnvironmentVariables>);
  const PORT = configService.get('PORT')
  await app.listen(PORT);
}
bootstrap();
