import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from '@nestjs/common';
import * as dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import { UserService } from 'src/modules/user/user.service';
dotenv.config();

@Injectable()
export class AuthenMiddleware implements NestMiddleware {
  constructor() {}
  async use(req: Request, res: Response, next: NextFunction) {
    next();
  }
}
