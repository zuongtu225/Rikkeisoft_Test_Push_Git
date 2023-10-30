import { AuthenModule } from './modules/auth/authen.module';
import { CategoryModule } from './modules/category/category.module';
import { MysqlModule } from './modules/database/ormConfig';
import { Module } from '@nestjs/common';
import { RoleModule } from './modules/role/role.module';
import { UserModule } from './modules/user/user.module';
import { SizeModule } from './modules/size/size.module';
import { ProductModule } from './modules/product/product.module';
import { ProductSizeModule } from './modules/productSize/productSize.module';
import { BrandModule } from './modules/brand/brand.module';
@Module({
  imports: [
    MysqlModule,
    AuthenModule,
    CategoryModule,
    RoleModule,
    UserModule,
    SizeModule,
    ProductModule,
    ProductSizeModule,
    BrandModule,
  ],
})
export class AppModule {}
