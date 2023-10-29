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
  async create(body: IUser): Promise<any> {
    const response = await this.userRepository.save(body);
    return response;
  }
  async findAll(): Promise<IUser[]> {
    const response = await this.userRepository.find({
      relations: ['role'],
    });
    return response;
  }
  async findOne(id: number): Promise<IUser> {
    const response = await this.userRepository.findOneBy({ id: id });
    return response;
  }
  async findByEmail(email: string): Promise<IUser> {
    const response = await this.userRepository.findOne({
      where: { email },
      relations: ['role'],
    });
    return response;
  }

  async updateUser(id: number, body: IUser): Promise<UpdateResult> {
    console.log(id, body, 'response');
    const response = await this.userRepository.update(id, body);
    console.log(response, 'response2');
    return response;
  }
  async updateStatus(id: number, body: IUser): Promise<UpdateResult> {
    const response = await this.userRepository.update(id, body);
    return response;
  }
}
