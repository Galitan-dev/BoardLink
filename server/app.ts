import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

export default async function getApp() {
  const app = await NestFactory.create(AppModule);

  return app;
}
