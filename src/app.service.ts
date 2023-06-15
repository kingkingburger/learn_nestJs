import { Inject, Injectable } from '@nestjs/common';
import * as process from 'process';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    private readonly configService: ConfigService,
    @Inject('CUSTOM_KEY') private readonly customValue,
  ) {}

  getHello(): string {
    return this.configService.get('SECRET');
  }
}
