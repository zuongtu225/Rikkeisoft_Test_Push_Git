import { Module } from '@nestjs/common';
import { MysqlModule } from './modules/database/ormconfig';

@Module({
  imports: [MysqlModule],
})
export class AppModule {}
