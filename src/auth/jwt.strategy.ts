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
    // Check if the payload is for a user
<<<<<<< 3739d343b0520c93bfdb8f11d6db2c56edfdb0aa
<<<<<<< 3739d343b0520c93bfdb8f11d6db2c56edfdb0aa
<<<<<<< 3739d343b0520c93bfdb8f11d6db2c56edfdb0aa
    if (payload.hasOwnProperty("userId") ) {
      console.log(payload.userId, payload.username, payload.email, payload.roles);
  
=======
    if (payload.hasOwnProperty("userId") ) {  
=======
    if (payload.hasOwnProperty("firstname") ) {  
>>>>>>> corrected payload bug
=======
<<<<<<< HEAD
    if (payload.hasOwnProperty("firstname") ) {  
=======
<<<<<<< HEAD
<<<<<<< HEAD
    if (payload.hasOwnProperty("userId") ) {
      console.log(payload.userId, payload.username, payload.email, payload.roles);
  
=======
    if (payload.hasOwnProperty("userId") ) {  
=======
    if (payload.hasOwnProperty("firstname") ) {  
>>>>>>> 050b61a (corrected payload bug)
>>>>>>> 2020039 (corrected payload bug)
>>>>>>> corrected payload bug
      
>>>>>>> Updated Some Any Return Types
      // Return the payload for users
      return { userId: payload._id, username: payload.username, email: payload.email, roles: payload.roles };
    }
  
    // Check if the payload is for a company
    if (payload.hasOwnProperty("name") ) {
    
      // Return the payload for companies
      return { companyId: payload._id, companyName: payload.name, companyEmail: payload.email, companyRoles: payload.roles };
    }
  
    // If the payload does not match any expected format, return null or throw an error
    throw new Error("Invalid payload format");
  }
}