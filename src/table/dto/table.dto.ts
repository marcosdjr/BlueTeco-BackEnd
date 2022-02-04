import { 
    IsNotEmpty,  
    IsNumber, 
    IsString,
} from 'class-validator';

export class TableDto {
  @IsString()
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @IsNumber()
  number: number;

  @IsNumber()
  total: number;

}
