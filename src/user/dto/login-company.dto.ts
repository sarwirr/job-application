<<<<<<< HEAD
import { Transform } from 'class-transformer';
=======
>>>>>>> 55ecdad (Implemented DTO for Authentication Routes)
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserLoginDto {
    @IsEmail()
<<<<<<< HEAD
    @Transform(({ value }) => value.toLowerCase())
=======
>>>>>>> 55ecdad (Implemented DTO for Authentication Routes)
    email: string;

    @IsNotEmpty()
    password: string;
}
  