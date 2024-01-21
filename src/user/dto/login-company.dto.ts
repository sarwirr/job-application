<<<<<<< HEAD
<<<<<<< HEAD
import { Transform } from 'class-transformer';
=======
>>>>>>> 55ecdad (Implemented DTO for Authentication Routes)
=======
import { Transform } from 'class-transformer';
>>>>>>> a5fc2fa (Added transform Pipe to Email & Applied Pipes Globally)
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserLoginDto {
    @IsEmail()
<<<<<<< HEAD
<<<<<<< HEAD
    @Transform(({ value }) => value.toLowerCase())
=======
>>>>>>> 55ecdad (Implemented DTO for Authentication Routes)
=======
    @Transform(({ value }) => value.toLowerCase())
>>>>>>> a5fc2fa (Added transform Pipe to Email & Applied Pipes Globally)
    email: string;

    @IsNotEmpty()
    password: string;
}
  