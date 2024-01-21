import { Transform } from "class-transformer";
import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class CreateUserDto 
{
    @IsNotEmpty()
    firstname: string;
  
    @MinLength(3)
    @IsNotEmpty()
    lastname: string;
  
    @IsNotEmpty()
    phoneNumber: string;

    @IsNotEmpty()
    @Transform(({ value }) => value.toLowerCase())
    email : string;

    @IsNotEmpty()
    password : string;
<<<<<<< HEAD
=======

    @IsNotEmpty()
    @Transform(({ value }) => value.toLowerCase())
    email : string;
>>>>>>> a5fc2fa (Added transform Pipe to Email & Applied Pipes Globally)
  
    @MinLength(3)
    @MaxLength(32)
    @IsNotEmpty()
    @Transform(({ value }) => value.toLowerCase())
    address: string;
  
    
}
