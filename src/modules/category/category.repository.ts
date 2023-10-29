import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Category } from './entities/category.entity';
import { ICategory } from './interface/category.interface';
@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  async create(body: ICategory): Promise<ICategory> {
    const response = await this.categoryRepository.save(body);
    return response;
  }
  async findAll(): Promise<ICategory[]> {
    const response = await this.categoryRepository.find();
    return response;
  }
  async findOne(id: number): Promise<ICategory> {
    const response = await this.categoryRepository.findOneBy({ id });
    return response;
  }
  async updateCategory(id: number, body: ICategory): Promise<UpdateResult> {
    const response = await this.categoryRepository.update(id, body);
    return response;
  }
  async deleteCategory(id: number): Promise<DeleteResult> {
    const response = await this.categoryRepository.delete(id);
    return response;
  }
}
