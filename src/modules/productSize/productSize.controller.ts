import { ProductSizeService } from './productSize.service';
import * as dotenv from 'dotenv';
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
} from '@nestjs/common';
import { IResponse } from 'src/shared/interfaces/response.interface';
import { AuthenGuard } from 'src/shared/guards/authen.guard';
import { AuthorGuard } from 'src/shared/guards/author.guard';
import { ProductSizeDto } from './dto/productSize.dto';
import { IProductSize } from './interface/productSize.interface';
import { ProductSize } from './entities/productSize.entity';

dotenv.config();
const init = process.env.API_URL;

@Controller(`${init}/productSizes`)
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(LoggingInterceptor)
@UseGuards(AuthorGuard)
@UseGuards(AuthenGuard)
export class ProductSizeController {
  constructor(private readonly productSizeService: ProductSizeService) {}
  @Post()
  async createProductSize(@Body() body: ProductSizeDto): Promise<IResponse> {
    return await this.productSizeService.createProductSizeService(body);
  }
  @Get()
  async getAllProductSizes(): Promise<IProductSize[]> {
    return await this.productSizeService.getAllProductSizeService();
  }
  @Get('/:id')
  async getDetailProductSize(
    @Param('id') id: number,
  ): Promise<ProductSize | IResponse> {
    return await this.productSizeService.getDetailProductSize(+id);
  }
}
