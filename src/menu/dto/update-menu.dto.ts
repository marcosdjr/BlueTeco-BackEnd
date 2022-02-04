import { 
    IsString, 
    IsNotEmpty, 
    IsNumber, 
    IsUrl,
    IsOptional, 
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMenuDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @IsOptional()
  item: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  @IsOptional()
  price: number;

  @IsString()
  @ApiProperty()
  @IsOptional()
  description: string;

  @IsUrl()
  @ApiProperty()
  @IsOptional()
  imageUrl: string;
}