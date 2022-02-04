import { IsNumber, IsString, IsNotEmpty, IsEmail, IsDate } from 'class-validator';

export class UserDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsDate()
  @IsNotEmpty()
  birthDate: Date;

  @IsString()
  role: string;
  
}
