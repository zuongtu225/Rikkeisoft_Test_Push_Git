import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { IRole } from './interface/role.interface';
@Injectable()
export class RoleRepository {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}
  async create(body: IRole): Promise<any> {
    return this.roleRepository.save(body);
  }
  async findAll(): Promise<IRole[]> {
    return this.roleRepository.find();
  }
  async findOne(id: number): Promise<IRole> {
    const newInstance = await this.roleRepository.findOneBy({ id: id });
    return newInstance;
  }
  async update(id: number, body: IRole): Promise<IRole> {
    await this.roleRepository.update(id, body);
    return this.findOne(id);
  }
  async delete(id: number): Promise<any> {
    const newInstance = await this.roleRepository.delete({ id: id });
    return newInstance;
  }
  async changeStatus(id: number, body: any): Promise<any> {
    const newInstance = await this.roleRepository.update(id, body);
    return newInstance;
  }
}
