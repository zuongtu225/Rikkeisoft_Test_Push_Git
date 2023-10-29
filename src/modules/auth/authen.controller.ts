import { AuthenService } from './authen.service';
import * as dotenv from 'dotenv';
import { IResponse } from 'src/shared/interfaces/response.interface';
import { LoggingInterceptor } from 'src/shared/interceptor/logging.interceptor';
import {
  Controller,
  Post,
  Body,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/authen.dto';
dotenv.config();
const init = process.env.API_URL;

@Controller(`${init}`)
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(LoggingInterceptor)
export class AuthenController {
  constructor(private readonly authenService: AuthenService) {}

  @Post('/register')
  async register(@Body() body: RegisterDto): Promise<IResponse> {
    return await this.authenService.registerService(body);
  }

  @Post('/login')
  async login(@Body() body: LoginDto): Promise<IResponse> {
    return await this.authenService.loginService(body);
  }
}
