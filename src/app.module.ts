import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { JobModule } from './job/job.module';
import { ApplicationModule } from './application/application.module';
import { CompanyModule } from './company/company.module';

require('dotenv').config(); 
@Module({
  imports: [
    //configure CORS here
    // CorsModule.forRoot({
    //   origin:  'http://localhost:4200',
    //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    //   // preflightContinue: false,
    //   // optionsSuccessStatus: 204,
    //   credentials: true,
    // }),

    UserModule,
    MongooseModule.forRoot(
      process.env.MONGODB_KEY,
    ),
    AuthModule,
    JobModule,
    ApplicationModule,
    CompanyModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
