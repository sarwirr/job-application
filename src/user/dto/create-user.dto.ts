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
    password : string;

    @IsNotEmpty()
    email : string;
  
    @MinLength(3)
    @MaxLength(32)
    @IsNotEmpty()
    address: string;
  
    @IsNotEmpty()
    gender: string;
  
    profileImage: string;
}
