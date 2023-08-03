import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    // console.log(payload);
  
    // Check if the payload is for a user
    if (payload.hasOwnProperty("userId") ) {
      console.log(payload.userId, payload.username, payload.email, payload.roles);
  
      // Return the payload for users
      return { userId: payload.userId, username: payload.username, email: payload.email, roles: payload.roles };
    }
  
    // Check if the payload is for a company
    if (payload.hasOwnProperty("companyId") ) {
    
      // Return the payload for companies
      return { companyId: payload.companyId, companyName: payload.name, companyEmail: payload.email, companyRoles: payload.roles };
    }
  
    // If the payload does not match any expected format, return null or throw an error
    throw new Error("Invalid payload format");
  }
}