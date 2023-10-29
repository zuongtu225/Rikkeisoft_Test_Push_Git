import { Exclude } from 'class-transformer';
import { Role } from 'src/modules/role/entities/role.entity';
import { IRole } from 'src/modules/role/interface/role.interface';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  firstName: string;
  @Column({ nullable: true })
  lastName: string;
  @Column()
  avatar: string;
  @Column()
  status: boolean;
  @Column({ unique: true, nullable: false })
  email: string;
  @Exclude()
  @Column()
  password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role' })
  role: Role;
}
