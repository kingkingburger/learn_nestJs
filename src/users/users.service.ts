import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entities/Users';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}
  async postUsers(email: string, nickname: string, password: string) {
    if (!email) {
      // 이메일 없다고 에러
      throw new Error('이메일이 없네요.');
      return;
    }
    if (!nickname) {
      // 이메일 없다고 에러
      throw new Error('nickname 없네요.');
      return;
    }
    if (!password) {
      // 이메일 없다고 에러
      throw new Error('password 없네요.');
      return;
    }
    const user = await this.usersRepository.findOne({
      where: { email: email },
    });
    if (user) {
      // 이미 존재하는 유저라고 애러
      throw new Error('이미 존재하는 사용자입니다.');
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    await this.usersRepository.save({
      email,
      nickname,
      password: hashedPassword,
    });
  }

  getUsers() {}
}
