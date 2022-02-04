import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsBoolean, IsOptional, IsNumber } from 'class-validator';

export class UpdateMenusTableDto {
  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ default: false })
  disconnectItem: boolean;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ default: 1 })
  menuId: number;
}