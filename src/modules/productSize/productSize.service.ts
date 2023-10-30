import { BadRequestException, Injectable } from '@nestjs/common';
import { IResponse } from 'src/shared/interfaces/response.interface';
import { ProductSizeDto } from './dto/productSize.dto';
import { IProductSize } from './interface/productSize.interface';
import { ProductSizeRepository } from './productSize.repository';
@Injectable()
export class ProductSizeService {
  constructor(private readonly productSizeRepository: ProductSizeRepository) {}
  async createProductSizeService(body: ProductSizeDto): Promise<IResponse> {
    let response: IProductSize;
    for (const size of body.sizeId) {
      const productSize: IProductSize = {
        productId: body.productId,
        sizeId: size,
      };
      response = await this.productSizeRepository.create(productSize);
    }
    if (response) {
      return {
        success: true,
        message: 'Tạo ProductSize thành công',
        data: '',
      };
    }
    throw new BadRequestException('Tạo ProductSize thất bại');
  }

  async getAllProductSizeService(): Promise<IProductSize[]> {
    return await this.productSizeRepository.findAll();
  }
  async getDetailProductSize(id: number): Promise<ProductSizeDto | IResponse> {
    const response = await this.productSizeRepository.findOne(id);
    if (response == null) {
      return {
        data: null,
        success: false,
        message: 'Id ProductSize không đúng',
      };
    }
  }
  //   async updateProductSizeService(
  //     id: number,
  //     body: IProductSize,
  //   ): Promise<IResponse> {
  //     const response = await this.productSizeRepository.updateProductSize(
  //       id,
  //       body,
  //     );
  //     if (response.affected == 1) {
  //       return {
  //         data: null,
  //         success: true,
  //         message: 'Cập nhật thành công',
  //       };
  //     }
  //     return {
  //       data: null,
  //       success: false,
  //       message: 'Id ProductSize không đúng',
  //     };
  //   }
}
