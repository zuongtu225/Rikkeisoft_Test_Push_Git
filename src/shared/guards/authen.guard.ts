import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const authToken = request.headers.authorization.split(' ')[1];
      if (!authToken) {
        throw new BadRequestException('Token không hợp lệ');
      }
      const payload = await this.jwtService.verifyAsync(authToken, {
        secret: process.env.JWT_SECRET,
      });
      const user = await this.userService.findByEmail(payload.email);
      if (!user) {
        throw new BadRequestException('Lỗi token');
      }
      request.user = user;
      return true;
    } catch (error) {
      throw new ForbiddenException('Token không hợp lệ', error);
    }
  }
}
