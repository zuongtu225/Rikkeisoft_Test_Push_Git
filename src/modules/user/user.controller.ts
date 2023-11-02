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
  UploadedFile,
} from '@nestjs/common';
import { AuthenGuard } from 'src/shared/guards/authen.guard';
import { AuthorGuard } from 'src/shared/guards/author.guard';
import { CurrentUser } from './decorator/currentUser.decorator';
import { IResponse } from 'src/shared/interfaces/response.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/shared/utils/cloudinary/cloudinary.service';
dotenv.config();
const init = process.env.API_URL;

@Controller(`${init}/users`)
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(LoggingInterceptor)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}
  @Get()
  async getAllUsers(): Promise<any> {
    return await this.userService.getAllUsers();
  }
  @Get('/me')
  @UseGuards(AuthenGuard)
  async getDetailByUser(@CurrentUser() user): Promise<any> {
    return await this.userService.getDetailUser(user.id);
  }
  @Get('/:id')
  async getDetailUser(@Param('id') id: number): Promise<IUser | IResponse> {
    return await this.userService.getDetailUser(id);
  }
  @Put('/update')
  async updateUser(@CurrentUser() user, @Body() body): Promise<any> {
    return await this.userService.updateUserService(user.id, body);
  }
  @Put('/update-avatar')
  @UseGuards(AuthenGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  async updateAvatarUser(
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    const response = await this.cloudinaryService.uploadSingleFile(file);
    return await this.userService.updateUserService(req.user.id, {
      avatar: response.url,
    });
  }
  @Put('/:id')
  @UseGuards(AuthorGuard)
  async updateStatusUser(@Param('id') id: number, @Body() body): Promise<any> {
    return await this.userService.updateStatusService(id, body);
  }
}
