import { Injectable } from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { IRole } from './interface/role.interface';
import { FindOneOptions, FindOptionsWhere } from 'typeorm';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}
  async createRole(body: IRole): Promise<any> {
    return await this.roleRepository.create(body);
  }
  async getAllRoles(): Promise<IRole[]> {
    return await this.roleRepository.findAll();
  }
  async getDetailRole(id: number): Promise<IRole> {
    return await this.roleRepository.findOne(id);
  }
  async updateRole(id: number, body: IRole): Promise<IRole> {
    return await this.roleRepository.update(id, body);
  }
  async deleteRole(id: number): Promise<any> {
    return await this.roleRepository.delete(id);
  }
}
