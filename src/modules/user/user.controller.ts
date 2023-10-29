import { UserService } from './user.service';
import * as dotenv from 'dotenv';
import { IUser } from './interface/user.interface';
import { LoggingInterceptor } from 'src/shared/interceptor/logging.interceptor';
import {
  Controller,
  Get,
  Put,
  Body,
  Param,
  ClassSerializerInterceptor,
  UseInterceptors,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { AuthenGuard } from 'src/shared/guards/authen.guard';
import { AuthorGuard } from 'src/shared/guards/author.guard';
import { AuthenService } from '../auth/authen.service';
import { CurrentUser } from './decorator/currentUser.decorator';
import { IResponse } from 'src/shared/interfaces/response.interface';
dotenv.config();
const init = process.env.API_URL;

@Controller(`${init}/users`)
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(LoggingInterceptor)
@UseGuards(AuthenGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthorGuard)
  async getAllUsers(): Promise<any> {
    return await this.userService.getAllUsers();
  }

  @Get('/:id')
  async getDetailUser(@Param('id') id: number): Promise<IUser | IResponse> {
    return await this.userService.getDetailUser(id);
  }
  @Put('/update')
  async updateUser(@CurrentUser() user, @Body() body): Promise<any> {
    return await this.userService.updateUserService(user.id, body);
  }

  @Put('/:id')
  @UseGuards(AuthorGuard)
  async updateStatusUser(@Param('id') id: number, @Body() body): Promise<any> {
    return await this.userService.updateStatusService(id, body);
  }
}
