import { Controller, Request,Get , Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import {LocalAuthGuard} from './auth/local-auth.guard';
import { CompanyAuthGuard } from './auth/company-auth.guard';

require('dotenv').config(); 

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async loginUser(@Request() req) {
    return this.authService.userLogin(req.user);
  }

  @UseGuards(CompanyAuthGuard)
  @Post('auth/company-login')
  async loginCompany(@Request() req) {
    return this.authService.companyLogin(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}