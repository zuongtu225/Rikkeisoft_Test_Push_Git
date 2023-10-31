import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { IProduct } from './interface/Product.interface';
import { Product } from './entities/product.entity';
import { ProductDto } from './dto/product.dto';
@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}
  async create(body: ProductDto): Promise<IProduct> {
    return await this.productRepository.save(body);
  }
  async findAll(): Promise<ProductDto[]> {
    return await this.productRepository.find({
      relations: ['category', 'brand', 'images'],
    });
  }
  async findOne(id: number): Promise<IProduct> {
    return await this.productRepository.findOne({
      where: { id },
      relations: ['category', 'brand'],
    });
  }
  async updateProduct(id: number, body: IProduct): Promise<UpdateResult> {
    return await this.productRepository.update(id, body);
  }
}
