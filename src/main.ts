import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
<<<<<<< 3739d343b0520c93bfdb8f11d6db2c56edfdb0aa
<<<<<<< 3739d343b0520c93bfdb8f11d6db2c56edfdb0aa

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
<<<<<<< 3739d343b0520c93bfdb8f11d6db2c56edfdb0aa
=======
=======
=======
<<<<<<< HEAD
>>>>>>> Added transform Pipe to Email & Applied Pipes Globally
import * as express from 'express';
import { ValidationPipe } from '@nestjs/common';
=======
<<<<<<< HEAD
>>>>>>> a5fc2fa (Added transform Pipe to Email & Applied Pipes Globally)

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
<<<<<<< HEAD
<<<<<<< HEAD
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
=======
=======
=======
import * as express from 'express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
<<<<<<< 3739d343b0520c93bfdb8f11d6db2c56edfdb0aa
>>>>>>> Added transform Pipe to Email & Applied Pipes Globally
=======
>>>>>>> 0bc9eba (Added transform Pipe to Email & Applied Pipes Globally)
>>>>>>> a5fc2fa (Added transform Pipe to Email & Applied Pipes Globally)
>>>>>>> Added transform Pipe to Email & Applied Pipes Globally
  
  const corsOptions = {
    origin: 'http://localhost:4200',
=======
<<<<<<< HEAD
=======
  
  const corsOptions = {
<<<<<<< HEAD
    origin: 'http://localhost:4200', // Replace with your actual client URL
>>>>>>> 7956da0 (Removed Unecessary Guard)
=======
    origin: 'http://localhost:4200',
>>>>>>> 55ecdad (Implemented DTO for Authentication Routes)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };

  app.use(express.json());
  app.enableCors(corsOptions);
    
<<<<<<< 3739d343b0520c93bfdb8f11d6db2c56edfdb0aa
>>>>>>> Removed Unecessary Guard
=======
<<<<<<< HEAD
=======
>>>>>>> 339b655 (Removed Unecessary Guard)
>>>>>>> 7956da0 (Removed Unecessary Guard)
>>>>>>> Removed Unecessary Guard
  await app.listen(3000);
}
bootstrap();
