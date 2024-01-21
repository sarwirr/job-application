import { IsEmail, IsNotEmpty } from 'class-validator';

export class CompanyLoginDto {
    @IsEmail()
    companyEmail: string;

    @IsNotEmpty()
    companyPassword: string;
}
  