import { IsString, IsNotEmpty, IsNumber, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  item: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  price: number;

  @IsString()
  @ApiProperty()
  description: string;

  @IsUrl()
  @ApiProperty()
  imageUrl: string;
}
