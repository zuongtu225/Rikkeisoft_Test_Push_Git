import { Exclude } from 'class-transformer';
import { Brand } from 'src/modules/brand/entities/brand.entity';
import { Category } from 'src/modules/category/entities/category.entity';
import { Image } from 'src/modules/images/entities/image.entity';
import { Size } from 'src/modules/size/entities/size.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ unique: true })
  title: string;
  @Column()
  price: number;
  @Column()
  stock: number;
  @Column()
  status: boolean;
  @Column({ nullable: true })
  isBestSeller: boolean;
  @Column('text')
  description: string;

  @Exclude()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;
  @Exclude()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;

  @ManyToOne(() => Category)
  category: Category;

  @ManyToOne(() => Brand)
  brand: Brand;

  @OneToMany(() => Image, (image) => image.productId)
  images: Image[];

  @ManyToMany(() => Size)
  @JoinTable({
    name: 'ProductSize',
    joinColumns: [{ name: 'productId' }],
    inverseJoinColumns: [{ name: 'sizeId' }],
  })
  sizes: Size[];
}
