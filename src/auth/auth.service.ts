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


  async validateCompany(companyEmail: string, companyPassword: string): Promise<any> {
    const company = await this.companyService.findOneByEmail(companyEmail);
  
    if (company) {
    const match = await bcrypt.compare(companyPassword, company.password);
    if (match) {
        
        // console.log(company._id.toString());
      
      return { companyname: company.name, email : company.email , id: company._id.toString() , roles:company.role };
    }}
    return null;
  }


  async login(userOrCompany: any) {

     if (userOrCompany.username) {
      // User login
      const payload = {
        username: userOrCompany.username,
        email: userOrCompany.email,
        userId: userOrCompany.id,
        role: userOrCompany.role,
      };
      return {
        access_token: this.jwtService.sign(payload),
        user: userOrCompany,
      };
    } else if (userOrCompany.companyname) {
      // Company login
      const payload = {
        companyName: userOrCompany.companyName,
        email: userOrCompany.email,
        companyId: userOrCompany.id,
        roles: userOrCompany.roles,
      };
      return {
        access_token: this.jwtService.sign(payload),
        company: userOrCompany,
      };
    }
    return ("you are here");
  }



}