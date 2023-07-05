import {
  BadRequestException,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entities/Users';
import { DataSource, Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { Workspaces } from '../entities/Workspaces';
import { WorkspaceMembers } from '../entities/WorkspaceMembers';
import { ChannelMembers } from '../entities/ChannelMembers';
import { query } from 'express';
import { Channels } from '../entities/Channels';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    @InjectRepository(WorkspaceMembers)
    private workspaceMembersRepository: Repository<WorkspaceMembers>,
    @InjectRepository(ChannelMembers)
    private channelMembersRepository: Repository<ChannelMembers>,
    private dataSource: DataSource,
  ) {}
  async postUsers(email: string, nickname: string, password: string) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    const user = await queryRunner.manager.getRepository(Users).findOne({
      where: { email: email },
    });
    if (user) {
      // 이미 존재하는 유저라고 애러
      throw new UnauthorizedException('이미 존재하는 사용자입니다.');
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    try {
      const returned = await queryRunner.manager.getRepository(Users).save({
        email,
        nickname,
        password: hashedPassword,
      });
      console.log(returned.id);
      throw new Error('롤백되나?');
      await queryRunner.manager.getRepository(WorkspaceMembers).save({
        User: returned,
        Workspace: 1 as unknown,
      });
      await queryRunner.manager.getRepository(ChannelMembers).save({
        User: returned,
        Channel: 1 as unknown as Channels,
      });
      await queryRunner.commitTransaction();
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  getUsers() {}
}
