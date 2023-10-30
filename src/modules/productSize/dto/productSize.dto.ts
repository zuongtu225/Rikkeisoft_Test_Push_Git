import { IsNotEmpty, IsNumber } from 'class-validator';
export class ProductSizeDto {
  @IsNumber()
  @IsNotEmpty()
  product: number;

  @IsNumber()
  @IsNotEmpty()
  size: number;
}
