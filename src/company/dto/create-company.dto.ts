import { IsEmail, IsNotEmpty, IsOptional, IsString } from '@nestjs/class-validator'
import { Transform } from 'class-transformer'

export class CreateCompanyDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  description: string

  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email: string

  @IsNotEmpty()
  @IsString()
  password: string

  @IsOptional()
  @IsString()
  website: string

  @IsNotEmpty()
  @IsString()
  state: string

  @IsNotEmpty()
  @IsString()
  country: string
}