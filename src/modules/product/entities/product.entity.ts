import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;
}
