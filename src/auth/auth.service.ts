import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CompanyService } from 'src/company/company.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService,
                private jwtService : JwtService,
                private companyService:CompanyService) {}

  async validate(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    
    if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
    //    console.log(user._id.toString());
      
      return { username: user.firstname, email : user.email , id: user._id.toString() , roles:user.role };
    }}
    return null;
  }

  async login(user: any) {
    // console.log(user);
    const payload = { username: user.username, email : user.email , userId: user.id, roles:user.roles};
    // console.log(payload);
    return {
      access_token: this.jwtService.sign(payload),
      user
    };
  }



  //company auth

  

  // async validateCompany(email: string, password: string): Promise<any> {
  //   const company = await this.companyService.findOne(email);
    
  //   if (company) {
  //   const match = await bcrypt.compare(password, company.password);
  //   if (match) {
  //   //    console.log(user._id.toString());
      
  //     return { username: company.name, email : company.email , id: company._id.toString()  };
  //   }}
  //   return null;
  // }

  // async loginCompany(company: any) {
  //   // console.log(user);
  //   const payload = { username: company.username, email : company.email , companyId: company.id, roles:company.roles};
  //   // console.log(payload);
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //     company
  //   };
  // }
}