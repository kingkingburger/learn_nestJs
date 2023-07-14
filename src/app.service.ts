import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    private readonly configService: ConfigService, // @Inject('CUSTOM_KEY') private readonly customValue,
  ) {}

  getHello(): string {
    return this.configService.get('SECRET');
  }
  getHello2(): string {
    return 'Hello World!';
  }
}
