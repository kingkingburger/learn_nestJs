import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getUser(): string {
    return await User.find();
  }

  async postUser(createUser: CreateUserDto): string {
    return await User.save(createUser);
  }
}
