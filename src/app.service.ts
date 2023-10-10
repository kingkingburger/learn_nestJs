import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisClientType } from 'redis';

@Injectable()
export class AppService {
  constructor(
    private readonly configService: ConfigService, // @Inject('CUSTOM_KEY') private readonly customValue,
    @Inject('REDIS_CLIENT')
    private readonly redis: RedisClientType,
  ) {}

  async redisTest() {
    this.redis.set('key', 'value');
    const value = await this.redis.get('key');
    return value;
  }

  getHello(): string {
    return this.configService.get('SECRET');
  }
  getHello2(): string {
    return 'Hello World!';
  }
}
