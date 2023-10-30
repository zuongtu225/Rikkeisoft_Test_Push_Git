import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { LoginDto } from './dto/authen.dto';
import { IUser } from '../user/interface/user.interface';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthenRepository {
  constructor(
    @InjectRepository(User)
    private authenRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(body: IUser): Promise<any> {
    const response = await this.authenRepository.save(body);
    return response;
  }

  async login(body: LoginDto): Promise<any> {
    const user = await this.authenRepository.findOne({
      where: { email: body.email },
      relations: ['role'],
    });
    if (!user) {
      throw new BadRequestException('Email chưa đăng ký tài khoản');
    }
    const checkPassword = await bcrypt.compare(body.password, user.password);
    const payload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role.role,
    };

    const token = checkPassword
      ? await this.jwtService.signAsync(payload)
      : null;
    return {
      access_token: token,
      status: true,
      data: user,
    };
  }
}
