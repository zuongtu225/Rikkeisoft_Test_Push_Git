import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { IRole } from './interface/role.interface';
import { RoleService } from './role.service';
import * as dotenv from 'dotenv';
import { RoleDto } from './dto/role.dto';
import { IResponse } from 'src/shared/interfaces/response.interface';
dotenv.config();
const init = process.env.API_URL;

@Controller(`${init}/roles`)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async createRole(@Body() body: RoleDto): Promise<IResponse> {
    return await this.roleService.createRole(body);
  }
  @Get()
  async getAllRoles(): Promise<IRole[]> {
    return await this.roleService.getAllRoles();
  }
  @Get('/:id')
  async getDetailRole(@Param() param): Promise<IRole> {
    const id = Number(param.id);
    return await this.roleService.getDetailRole(id);
  }
  @Put('/:id')
  async updateRole(@Param() param, @Body() body): Promise<IResponse> {
    const id = Number(param.id);
    return await this.roleService.updateRole(id, body);
  }
  @Delete('/:id')
  async deleteRole(@Param() param): Promise<IResponse> {
    const id = Number(param.id);
    return await this.roleService.deleteRole(id);
  }
}
