import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CompanyService } from 'src/company/company.service';

import { User } from '../user/entities/user.entity';
import { Company } from '../company/entities/company.entity';
import { CompanyLoginDto } from '../company/dto/login-company.dto';
import { UserLoginDto } from '../user/dto/login-company.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService,
                private jwtService : JwtService,
                private companyService:CompanyService) {}

  async validate(email: string, password: string): Promise<Partial<User>> {
    const user = await this.usersService.findOne(email);
    
    if (user) {
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        return { firstname: user.firstname, email : user.email , _id: user._id.toString() , role:user.role };
      }
    }
    return null;
  }

  async validateCompany(companyEmail: string, companyPassword: string): Promise<Partial<Company>> {
    const company = await this.companyService.findOneByEmail(companyEmail);
  
    if (company) {
      const match = await bcrypt.compare(companyPassword, company.password);

      if (match) {
        return { name: company.name, email : company.email , _id: company._id.toString() , role:company.role };
      }
    }
    return null;
  }

  async userLogin(user: UserLoginDto) {
    const payload = await this.validate(user.email, user.password);

    return payload ? {
      access_token: this.jwtService.sign(payload),
      user: user,
    } : { message: 'Invalid email or password' };
  }

  async companyLogin(company: CompanyLoginDto) {
    const payload = await this.validateCompany(company.companyEmail, company.companyPassword);

    return payload ? {
      access_token: this.jwtService.sign(payload),
      company: company,
    } : { message: 'Invalid email or password' };
  }
}