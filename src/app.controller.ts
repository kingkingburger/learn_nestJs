import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() // GET
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('hi') // POST /hi
  postHello(): string {
    return this.appService.getHello();
  }

  // req, res에 대해 알고 있는 부분
  @Get('user') // GET /user
  getUser(): string {
    return this.appService.getUser();
  }

  @Post('user') // POST /user
  postUser(): string {
    // return this.appService.postUser();
    return { code: 'SUCCESS', data: user };
  }
}
