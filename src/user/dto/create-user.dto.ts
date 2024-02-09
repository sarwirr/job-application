import { Transform } from "class-transformer";
import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class CreateUserDto 
{
    @IsNotEmpty()
    firstname: string;
  
    @MinLength(3)
    @IsNotEmpty()
    lastname: string;
  
    @MinLength(8)
    @MaxLength(50)
    @IsNotEmpty()
    phoneNumber: string;

    @IsNotEmpty()
    @Transform(({ value }) => value.toLowerCase())
    email : string;

    @IsNotEmpty()
    password : string;
  
    @MinLength(3)
    @MaxLength(32)
    @IsNotEmpty()
    @Transform(({ value }) => value.toLowerCase())
    address: string;
  
    @IsNotEmpty()
    gender: string;
  
    profileImage: string;
}
