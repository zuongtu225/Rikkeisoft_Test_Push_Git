import { MysqlModule } from './modules/database/ormconfig';
import { UserController } from './modules/user/user.controller';
import { LoggerMiddleware } from './shared/middlewares/logger.middleware';
import { Module, MiddlewareConsumer } from '@nestjs/common';
@Module({
  imports: [MysqlModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(UserController);
  }
}
