import { BadRequestException, Injectable, Request } from '@nestjs/common';
import { AuthenRepository } from './authen.repository';
import { LoginDto, RegisterDto } from './dto/authen.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthenService {
  constructor(private readonly authenRepository: AuthenRepository) {}
  async registerService(body: RegisterDto): Promise<any> {
    const newPassword = await bcrypt.hash(body.password, 10);
    body.password = newPassword;
    const newAccount = {
      email: body.email,
      password: newPassword,
      avatar: '',
      firstName: '',
      lastName: '',
      role: 2,
      status: true,
    };
    const response = await this.authenRepository.register(newAccount);
    if (response) {
      return {
        data: null,
        success: true,
        message: 'Đăng ký thành công',
      };
    }
    throw new BadRequestException('Đăng ký thất bại');
  }

  async loginService(body: LoginDto): Promise<any> {
    return this.authenRepository.login(body);
  }
}
