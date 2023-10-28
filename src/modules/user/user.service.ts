import { HttpException, Injectable } from '@nestjs/common';
import { IUser } from './interface/user.interface';
import { IResponse } from 'src/shared/interfaces/response.interface';
import { UpdateResult } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { UserRepository } from './user.repository';
import { HttpStatus } from 'src/shared/interfaces/response.enum';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async createUser(body: UserDto): Promise<any> {
    // const response = await this.UserRepository.create(body);
    // if (response) {
    //   return {
    //     data: null,
    //     success: true,
    //     message: 'Tạo User thành công',
    //   };
    // }
  }
  async findByProfileId(id: number): Promise<any> {
    const aa = await this.userRepository.findByProfileId(id);
    if (aa) {
      // throw new HttpException('Forbidden', HttpStatus);
    }
  }
  async getAllUsers(): Promise<IUser[]> {
    return await this.userRepository.findAll();
  }
  async getDetailUser(id: number): Promise<IUser> {
    return await this.userRepository.findOne(id);
  }
  async updateUser(id: number, body: IUser): Promise<IResponse> {
    const response = await this.userRepository.update(id, body);
    if (response.affected == 1) {
      return {
        data: null,
        success: true,
        message: 'Xóa User thành công',
      };
    }
    return {
      data: null,
      success: false,
      message: 'Id User không đúng',
    };
  }
  async deleteUser(id: number): Promise<IResponse> {
    const response = await this.userRepository.delete(id);
    if (response.affected == 1) {
      return {
        data: null,
        success: true,
        message: 'Xóa User thành công',
      };
    }
    return {
      data: null,
      success: false,
      message: 'Id User không đúng',
    };
  }
}
