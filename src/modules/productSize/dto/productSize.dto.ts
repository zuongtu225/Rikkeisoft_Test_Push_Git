import { IsNotEmpty, IsNumber, IsBoolean, IsString } from 'class-validator';

export class ProductSizeDto {
  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @IsNumber()
  @IsNotEmpty()
  sizeId: number;
}
