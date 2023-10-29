import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
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
    const response = await this.productRepository.save(body);
    return response;
  }
  async findAll(): Promise<ProductDto[]> {
    const response = await this.productRepository.find();
    console.log(response, 'dto');
    return response;
  }
  async findOne(id: number): Promise<IProduct> {
    const response = await this.productRepository.findOneBy({ id });
    return response;
  }
  async updateProduct(id: number, body: IProduct): Promise<UpdateResult> {
    const response = await this.productRepository.update(id, body);
    return response;
  }
  // async deleteProduct(id: number): Promise<DeleteResult> {
  //   const response = await this.ProductRepository.delete(id);
  //   return response;
  // }
}
