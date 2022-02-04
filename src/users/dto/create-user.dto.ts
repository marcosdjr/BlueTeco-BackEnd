import {
  IsDateString,
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty()
  password: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty()
  birthDate: Date;

  @IsString()
  @ApiProperty()
  role: string;

}
