import { Injectable } from '@nestjs/common';
import { getIntlayer } from 'express-intlayer';

@Injectable()
export class AppService {
  getHello(): string {
    return getIntlayer('app').greet;
  }
}
