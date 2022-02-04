import { 
    IsNotEmpty, 
    IsNumber, 
    IsOptional,
    IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTableDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  total: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  @IsOptional()
  number: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ default: 1 })
  menuId: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ default: 1 })
  deleteMenuId: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ default: 1 })
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ default: 1 })
  deleteUserId: number;

}