import { OrderService } from './order.service';
import * as dotenv from 'dotenv';
import { IOrder } from './interface/order.interface';
import { LoggingInterceptor } from 'src/shared/interceptor/logging.interceptor';
import {
  Controller,
  Get,
  Put,
  Body,
  Param,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
  Post,
  Delete,
} from '@nestjs/common';
import { IResponse } from 'src/shared/interfaces/response.interface';
import { AuthenGuard } from 'src/shared/guards/authen.guard';
import { AuthorGuard } from 'src/shared/guards/author.guard';
import { Order } from './entities/order.entity';
import { CurrentUser } from '../user/decorator/currentUser.decorator';
dotenv.config();
const init = process.env.API_URL;

@Controller(`${init}/orders`)
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(LoggingInterceptor)
@UseGuards(AuthenGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(
    @CurrentUser() user,
    @Body() body: IOrder,
  ): Promise<IResponse> {
    return await this.orderService.createOrderService(user.id, body);
  }
  @Get()
  async getAllOrders(): Promise<Order[]> {
    return await this.orderService.getAllOrderService();
  }
  @Get('/:id')
  async getDetailOrder(@Param('id') id): Promise<Order | IResponse> {
    return await this.orderService.getDetailOrderService(+id);
  }
  @Put('/:id')
  async updateOrder(@Param('id') id, @Body() body): Promise<IResponse> {
    return await this.orderService.updateOrderService(id, body);
  }
}
