import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService,
                private jwtService : JwtService) {}

  async validateUser(email: string, password: string): Promise<any> {
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
}