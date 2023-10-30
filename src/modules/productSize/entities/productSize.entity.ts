import { Exclude } from 'class-transformer';

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductSize {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  productId: number;
  @Column()
  sizeId: number;
}
