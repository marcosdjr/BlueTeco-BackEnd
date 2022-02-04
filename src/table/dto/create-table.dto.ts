import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTableDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  number: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  total: number;

}
