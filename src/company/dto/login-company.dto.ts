<<<<<<< HEAD
import { Transform } from 'class-transformer';
=======
>>>>>>> 55ecdad (Implemented DTO for Authentication Routes)
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CompanyLoginDto {
    @IsEmail()
<<<<<<< HEAD
    @Transform(({ value }) => value.toLowerCase())
=======
>>>>>>> 55ecdad (Implemented DTO for Authentication Routes)
    companyEmail: string;

    @IsNotEmpty()
    companyPassword: string;
}
  