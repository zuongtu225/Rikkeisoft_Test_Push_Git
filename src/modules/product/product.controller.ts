import { ProductService } from './product.service';
import * as dotenv from 'dotenv';
import { IProduct } from './interface/product.interface';
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
import { ProductDto } from './dto/product.dto';

dotenv.config();
const init = process.env.API_URL;

@Controller(`${init}/products`)
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(LoggingInterceptor)
@UseGuards(AuthorGuard)
@UseGuards(AuthenGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Post()
  async createProduct(@Body() body: ProductDto): Promise<any> {
    return await this.productService.createProductService(body);
  }
  @Get()
  async getAllProducts(): Promise<ProductDto[]> {
    return await this.productService.getAllProductService();
  }
  @Get('/:id')
  async getDetailProduct(
    @Param('id') id: number,
  ): Promise<IProduct | IResponse> {
    return await this.productService.getDetailProduct(id);
  }
  @Put('/:id')
  async updateProduct(
    @Param('id') id: number,
    @Body() body,
  ): Promise<IResponse> {
    return await this.productService.updateProductService(id, body);
  }
  @Delete('/:id')
  async deleteProduct(@Param('id') id: number): Promise<IResponse> {
    return await this.productService.deleteSizeService(id);
  }
}
