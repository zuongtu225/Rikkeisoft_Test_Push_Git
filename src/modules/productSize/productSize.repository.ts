import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductSize } from './entities/productSize.entity';
import { IProductSize } from './interface/productSize.interface';
@Injectable()
export class ProductSizeRepository {
  constructor(
    @InjectRepository(ProductSize)
    private productSizeRepository: Repository<ProductSize>,
  ) {}
  async create(body: any): Promise<ProductSize> {
    return this.productSizeRepository.save(body);
  }
  //   async findAll(): Promise<ProductSizeDto[]> {
  //     const response = await this.productSizeRepository.find({
  //       relations: ['category', 'brand', 'images'],
  //     });
  //     return response;
  //   }
  //   async findOne(id: number): Promise<IProductSize> {
  //     const response = await this.productSizeRepository.findOne({
  //       where: { id },
  //       relations: ['category', 'brand'],
  //     });
  //     return response;
  //   }
  //   async updateProductSize(
  //     id: number,
  //     body: IProductSize,
  //   ): Promise<UpdateResult> {
  //     const response = await this.productSizeRepository.update(id, body);
  //     return response;
  //   }
}
