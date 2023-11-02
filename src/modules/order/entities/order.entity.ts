import { Exclude } from 'class-transformer';
import { OrderItem } from 'src/modules/orderItem/entities/orderItem.entity';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @PrimaryColumn()
  @Index({ unique: true })
  codeOrder: number;

  @Column()
  status: string;

  @Column()
  addressId: number;
  @Column()
  paymentId: number;
  @Column()
  userId: number;

  @Exclude()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;
  @Exclude()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.codeOrder, {
    eager: true,
  })
  orderItems: OrderItem[];
}
