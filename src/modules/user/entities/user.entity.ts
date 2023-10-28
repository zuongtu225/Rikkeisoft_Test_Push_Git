import { ProfileEntity } from 'src/modules/profile/entities/profile.entity';
import { IProfile } from 'src/modules/profile/interface/profile.interface';
import { Role } from 'src/modules/role/entities/role.entity';
import { IRole } from 'src/modules/role/interface/role.interface';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  password: string;
  @Column()
  email: string;
  @Column()
  avatar: string;
  @Column()
  status: string;

  @ManyToOne(() => Role, (role) => role.users)
  role: IRole;

  @OneToOne(() => ProfileEntity)
  @JoinColumn()
  profile: IProfile;
}
