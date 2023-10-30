import { BadRequestException, Injectable } from '@nestjs/common';
import { IResponse } from 'src/shared/interfaces/response.interface';
import { ImageRepository } from './image.repository';
import { Iimage } from './interface/image.interface';
import { UpdateResult } from 'typeorm';
@Injectable()
export class ImageService {
  constructor(private readonly imageRepository: ImageRepository) {}
  async createImageService(productId: number, files: any): Promise<IResponse> {
    let response: IResponse;
    for (const item of files) {
      const image = {
        src: item.url,
        productId,
      };
      response = await this.imageRepository.create(image);
    }
    if (response) {
      return {
        success: true,
        message: 'Thêm ảnh thành công',
        data: '',
      };
    }
    throw new BadRequestException('Thêm ảnh thất bại');
  }
  async getAllImageService(): Promise<Iimage[]> {
    return await this.imageRepository.findAll();
  }
  async getDetailImage(id: number): Promise<Iimage | IResponse> {
    const response = await this.imageRepository.findOne(id);
    if (response == null) {
      return {
        data: null,
        success: false,
        message: 'Id Image không đúng',
      };
    }
    return response;
  }

  async updateImageService(productId: number, files: any): Promise<any> {
    // const images = await this.imageRepository.findAllById(productId);
    // const updateImage = images.map((item: any) => {
    //   if (item.productId.id == productId) {
    //     for (const image of files) {
    //       return {
    //         ...item,
    //         src: image.url,
    //       };
    //     }
    //   }
    // });
    // let response: UpdateResult;
    // for (const item of files) {
    //   const image = {
    //     src: item.url,
    //     productId,
    //   };
    //   let response = await this.imageRepository.updateImage(productId, image);
    //   console.log(response, 'result count <<<');
    // }
    // if (response.affected == 1) {
    //   return {
    //     data: null,
    //     success: true,
    //     message: 'Cập nhật thành công',
    //   };
    // }
    // return {
    //   data: null,
    //   success: false,
    //   message: 'Id Product không đúng',
    // };
  }
  async deleteImageService(id: number): Promise<IResponse> {
    const response = await this.imageRepository.delete(id);
    if (response.affected == 1) {
      return {
        data: null,
        success: true,
        message: 'Xoá thành công',
      };
    }
    return {
      data: null,
      success: false,
      message: 'Id Image không đúng',
    };
  }
}
