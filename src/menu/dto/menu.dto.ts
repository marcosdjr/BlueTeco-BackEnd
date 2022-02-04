import { 
    IsNotEmpty,  
    IsNumber, 
    IsString,
    IsUrl, 
} from 'class-validator';

export class MenuDto {
  @IsString()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  item: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  imageUrl: string;

}
