import { Injectable } from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { IRole } from './interface/role.interface';
import { RoleDto } from './dto/role.dto';
import { IResponse } from 'src/shared/interfaces/response.interface';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}
  async createRole(body: RoleDto): Promise<IResponse> {
    const response = await this.roleRepository.create(body);
    if (response) {
      return {
        data: null,
        success: true,
        message: 'Tạo Role thành công',
      };
    }
  }
  async getAllRoles(): Promise<IRole[]> {
    return await this.roleRepository.findAll();
  }
  async getDetailRole(id: number): Promise<IRole> {
    return await this.roleRepository.findOne(id);
  }
  async updateRole(id: number, body: IRole): Promise<IResponse> {
    const response = await this.roleRepository.update(id, body);
    if (response.affected == 1) {
      return {
        data: null,
        success: true,
        message: 'Xóa role thành công',
      };
    }
    return {
      data: null,
      success: false,
      message: 'Id role không đúng',
    };
  }
  async deleteRole(id: number): Promise<IResponse> {
    const response = await this.roleRepository.delete(id);
    if (response.affected == 1) {
      return {
        data: null,
        success: true,
        message: 'Xóa role thành công',
      };
    }
    return {
      data: null,
      success: false,
      message: 'Id role không đúng',
    };
  }
}
