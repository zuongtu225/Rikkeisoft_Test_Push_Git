import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Image } from './entities/image.entity';
import { Iimage } from './interface/image.interface';
import { IResponse } from 'src/shared/interfaces/response.interface';
@Injectable()
export class ImageRepository {
  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
  ) {}
  async create(body: Iimage): Promise<any> {
    const response = await this.imageRepository.save(body);
    return response;
  }
  async findAll(): Promise<Iimage[]> {
    const response = await this.imageRepository.find({
      relations: ['productId'],
    });
    return response;
  }
  // async findAllById(id: number): Promise<any> {
  //   const images = await this.imageRepository
  //     .createQueryBuilder('Image')
  //     .leftJoinAndSelect('images.productId', 'images')
  //     .select(['images.id', 'images.src'])
  //     .where(' productId = :productId', { productId: id })
  //     .getMany();
  //   return images;
  // }
  async findOne(id: number): Promise<Iimage> {
    const response = await this.imageRepository.findOneBy({ id });
    return response;
  }
  async updateImage(productId: number, image: Iimage): Promise<any> {
    const response = await this.imageRepository.update(productId, image);
    return response;
  }
  async delete(id: number): Promise<DeleteResult> {
    const response = await this.imageRepository.delete(id);
    return response;
  }
}
