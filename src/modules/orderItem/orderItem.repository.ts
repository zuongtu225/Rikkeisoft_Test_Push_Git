import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IOrderItem } from './interface/orderItem.interface';
import { OrderItem } from './entities/orderItem.entity';
@Injectable()
export class OrderItemRepository {
  constructor(
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
  ) {}
  async create(body: IOrderItem): Promise<OrderItem> {
    return await this.orderItemRepository.save(body);
  }
  async findAll(): Promise<OrderItem[]> {
    return await this.orderItemRepository.find();
  }
}
