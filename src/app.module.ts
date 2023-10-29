import { MysqlModule } from './modules/database/ormConfig';
import { Module } from '@nestjs/common';
@Module({
  imports: [MysqlModule],
})
export class AppModule {}
