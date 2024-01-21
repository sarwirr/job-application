import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
<<<<<<< 3739d343b0520c93bfdb8f11d6db2c56edfdb0aa

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
<<<<<<< 3739d343b0520c93bfdb8f11d6db2c56edfdb0aa
=======
=======
import * as express from 'express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
>>>>>>> Added transform Pipe to Email & Applied Pipes Globally
  
  const corsOptions = {
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };

  app.use(express.json());
  app.enableCors(corsOptions);
    
>>>>>>> Removed Unecessary Guard
  await app.listen(3000);
}
bootstrap();
