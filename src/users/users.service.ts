import {
  ForbiddenException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { ChannelMembers } from '../entities/ChannelMembers';

import { Users } from '../entities/Users';
import { WorkspaceMembers } from '../entities/WorkspaceMembers';
import { HttpExceptionFilter } from '../common/filter/http-exception.filter';

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

  async findByEmail(email: string) {
    return this.usersRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });
  }

  async join(email: string, nickname: string, password: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const user = await queryRunner.manager
        .getRepository(Users)
        .findOne({ where: { email } });
      if (user) {
        throw new ForbiddenException('이미 존재하는 사용자입니다');
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      // throw new NotFoundException('롤백해봐');

      const returned = await queryRunner.manager.getRepository(Users).save({
        email,
        nickname,
        password: hashedPassword,
      });
      const workspaceMember = queryRunner.manager
        .getRepository(WorkspaceMembers)
        .create();
      workspaceMember.User = returned.id;
      workspaceMember.Workspace = 1;
      await queryRunner.manager
        .getRepository(WorkspaceMembers)
        .save(workspaceMember);
      await queryRunner.manager.getRepository(ChannelMembers).save({
        User: returned.id,
        ChannelId: 1,
      });
      await queryRunner.commitTransaction();

      return true;
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      console.log('이거 실행됨?');
      await queryRunner.release();
    }
  }

  // async join(
  //   email: string,
  //   nickname: string,
  //   password: string,
  //   // queryRunnerManager: EntityManager,
  // ) {
  //   const queryRunner = this.dataSource.createQueryRunner();
  //   // const queryRunner = queryRunnerManager.queryRunner;
  //   await queryRunner.connect();
  //   await queryRunner.startTransaction();
  //
  //   try {
  //     throw new NotFoundException('롤백해봐');
  //
  //     return true;
  //   } catch (error) {
  //     console.error(error);
  //     await queryRunner.rollbackTransaction();
  //     await queryRunner.release();
  //
  //     // throw error;
  //   } finally {
  //     console.log('이거 실행됨?');
  //     await queryRunner.release();
  //   }
  // }
}
