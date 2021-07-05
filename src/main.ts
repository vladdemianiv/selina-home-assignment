import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import APP_CONFIG from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = APP_CONFIG.PORT;
  await app.listen(port);
  Logger.log(`App listening on port ${port}.`);
}
bootstrap();
