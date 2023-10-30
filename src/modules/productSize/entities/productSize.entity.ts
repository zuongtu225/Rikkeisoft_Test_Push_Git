import { Product } from 'src/modules/product/entities/product.entity';
import { Size } from 'src/modules/size/entities/size.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'product_size' })
export class ProductSize {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Size, (item) => item.productSizes)
  @JoinColumn({ name: 'sizeId' })
  size: Size;
  @ManyToOne(() => Product, (item) => item.productSizes)
  @JoinColumn({ name: 'productId' })
  product: Product;
}
