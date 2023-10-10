import { Controller, Get, Logger, NotFoundException } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('WORKSPACE')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  private readonly logger = new Logger(AppController.name);
  @Get() // GET
  getHello() {
    this.logger.log('This is a log message');
    this.logger.error('This is an error message');
    this.logger.warn('This is a warning message');
    this.logger.debug('This is a debug message');
    try {
      new Error('일부러 에러발생');
    } catch (error) {
      // 에러 로깅
      // console.log('에러발생');
      // this.logger.error('An error occurred:', error.stack);
      return error;
    }
    return this.appService.getHello2();
  }
  @Get('/redis') // GET
  redisTest() {
    return this.appService.redisTest();
  }
}
