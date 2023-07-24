import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) 
{
    @IsOptional()
    firstname: string;
  
    @MinLength(3)
    @IsOptional()
    lastname: string;
  
    @MinLength(8)
    @MaxLength(50)
    @IsOptional()
    phoneNumber: string;
  
    @MinLength(3)
    @MaxLength(32)
    @IsOptional()
    dateBirth: string;
  
    @MinLength(3)
    @MaxLength(32)
    @IsOptional()
    address: string;
  
    @IsOptional()
    profileImage: string;
}
