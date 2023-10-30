import { Product } from 'src/modules/product/entities/product.entity';
import { Size } from 'src/modules/size/entities/size.entity';
import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'product_size' })
export class ProductSize {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Size, (size) => size.productSizes)
  @JoinColumn({ name: 'sizeId' })
  sizeId: Size;

  @ManyToOne(() => Product, (product) => product.productSizes)
  @JoinColumn({ name: 'productId' })
  productId: Product;
}
