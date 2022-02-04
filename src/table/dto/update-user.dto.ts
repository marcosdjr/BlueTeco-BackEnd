import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsBoolean, IsOptional, IsNumber } from 'class-validator';

export class UpdateUsersTableDto {
  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ default: false })
  disconnectUser: boolean;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ default: 1 })
  userId: number;
}