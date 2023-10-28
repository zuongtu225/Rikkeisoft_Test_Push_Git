import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { IUser } from './interface/user.interface';
import { User } from './entities/user.entity';
@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async findByProfileId(profileId: number): Promise<User | undefined> {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.profile', 'profile')
      .where('profile.id = :profileId', { profileId })
      .getOne();
  }
  async create(body: IUser): Promise<any> {
    const response = await this.userRepository.save(body);
    return response;
  }
  async findAll(): Promise<IUser[]> {
    return await this.userRepository.find();
  }
  async findOne(id: number): Promise<IUser> {
    const newInstance = await this.userRepository.findOneBy({ id: id });
    return newInstance;
  }
  async update(id: number, body: IUser): Promise<UpdateResult> {
    const response = await this.userRepository.update(id, body);
    return response;
  }
  async delete(id: number): Promise<DeleteResult> {
    const newInstance = await this.userRepository.delete({ id: id });
    return newInstance;
  }
}
