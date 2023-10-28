import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import * as dotenv from 'dotenv';
import { UserDto } from './dto/user.dto';
import { IResponse } from 'src/shared/interfaces/response.interface';
import { IUser } from './interface/user.interface';
dotenv.config();
const init = process.env.API_URL;

@Controller(`${init}/users`)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() body: UserDto): Promise<any> {
    return await this.userService.createUser(body);
  }
  @Get()
  async getAllUsers(): Promise<any> {
    return await this.userService.getAllUsers();
  }
  @Get('/:id')
  async getDetailUser(@Param('id') id: number): Promise<IUser> {
    return await this.userService.getDetailUser(id);
  }
  @Get('/profile/:id')
  async findByProfileId(@Param('id') id: number): Promise<any> {
    return await this.userService.getDetailUser(id);
  }
  @Put('/:id')
  async updateUser(@Param('id') id: number, @Body() body): Promise<IResponse> {
    return await this.userService.updateUser(id, body);
  }
  @Delete('/:id')
  async deleteUser(@Param() id: number): Promise<IResponse> {
    return await this.userService.deleteUser(id);
  }
}
