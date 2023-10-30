import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

import { ProductSizeDto } from './dto/productSize.dto';
import { ProductSize } from './entities/productSize.entity';
import { IProductSize } from './interface/productSize.interface';
@Injectable()
export class ProductSizeRepository {
  constructor(
    @InjectRepository(ProductSize)
    private productSizeRepository: Repository<ProductSize>,
  ) {}
  async create(body: ProductSizeDto): Promise<IProductSize> {
    const response = await this.productSizeRepository.save(body);
    return response;
  }
  async findAll(): Promise<ProductSizeDto[]> {
    const response = await this.productSizeRepository.find({
      relations: ['category', 'brand', 'images'],
    });
    return response;
  }
  async findOne(id: number): Promise<IProductSize> {
    const response = await this.productSizeRepository.findOne({
      where: { id },
      relations: ['category', 'brand'],
    });
    return response;
  }
  async updateProductSize(
    id: number,
    body: IProductSize,
  ): Promise<UpdateResult> {
    const response = await this.productSizeRepository.update(id, body);
    return response;
  }
}
