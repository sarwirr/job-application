import { Controller, Request,Get , Post, UseGuards, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UserLoginDto } from './user/dto/login-company.dto';
import { CompanyLoginDto } from './company/dto/login-company.dto';

require('dotenv').config(); 

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Post('auth/login')
  @UsePipes(new ValidationPipe({ transform: true }))
  async loginUser(@Body() body: UserLoginDto) {

    return this.authService.userLogin(body);

  }

  @Post('auth/company-login')
  @UsePipes(new ValidationPipe({ transform: true }))
  async loginCompany(@Body() body: CompanyLoginDto) {

    return this.authService.companyLogin(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    
    return req.user;
  }
}