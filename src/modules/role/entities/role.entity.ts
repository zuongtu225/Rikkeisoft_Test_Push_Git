import { User } from 'src/modules/user/entities/user.entity';
import { IUser } from 'src/modules/user/interface/user.interface';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('role')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true, nullable: true })
  role: number;
  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
