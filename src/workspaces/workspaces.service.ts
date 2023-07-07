import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChannelMembers } from '../entities/ChannelMembers';
import { Channels } from '../entities/Channels';
import { Users } from '../entities/Users';
import { WorkspaceMembers } from '../entities/WorkspaceMembers';
import { Workspaces } from '../entities/Workspaces';

@Injectable()
export class WorkspacesService {
  @InjectRepository(Workspaces)
  private workspacesRepository: Repository<Workspaces>;
  @InjectRepository(Channels)
  private channelsRepository: Repository<Channels>;
  @InjectRepository(WorkspaceMembers)
  private workspaceMembersRepository: Repository<WorkspaceMembers>;
  @InjectRepository(ChannelMembers)
  private channelMembersRepository: Repository<ChannelMembers>;
  @InjectRepository(Users)
  private usersRepository: Repository<Users>;

  async findById(id: number) {
    return this.workspacesRepository.findOne({ where: { id } });
  }

  async findMyWorkspaces(myId: number) {
    return this.workspacesRepository.find({
      where: {
        WorkspaceMembers: [{ User: myId }],
      },
    });
  }

  async createWorkspace(name: string, url: string, myId: number) {
    const workspace = new Workspaces();
    workspace.name = name;
    workspace.url = url;
    workspace.Owner = myId;

    // workspace 만들어서
    const returned = await this.workspacesRepository.save(workspace);
    const workspaceMember = new WorkspaceMembers();
    workspaceMember.User = myId;
    workspaceMember.Workspace = returned.id;

    // 채널에 나를 넣습니다.
    await this.workspaceMembersRepository.save(workspaceMember);
    const channel = new Channels();
    channel.name = '일반';
    channel.Workspace = returned.id;

    // 채널에 나를 추가하기
    const channelReturned = await this.channelsRepository.save(channel);
    const channelMember = new ChannelMembers();
    channelMember.User = myId;
    channelMember.Channel = channelReturned.id;

    await this.channelMembersRepository.save(channelMember);
  }

  async getWorkspaceMembers(url: string) {
    return this.usersRepository
      .createQueryBuilder('user')
      .innerJoin('user.WorkspaceMembers', 'members')
      .innerJoin('members.Workspace', 'workspace', 'workspace.url = :url', {
        // .innerJoin('members.Workspace', 'workspace', `workspace.url = ${url}`, { 가능은 한대 sql injection에 취약
        url,
      })
      .getMany();
  }

  async createWorkspaceMembers(url, email) {
    const workspace = await this.workspacesRepository.findOne({
      where: { url },
      join: {
        alias: 'workspace',
        innerJoinAndSelect: {
          channels: 'workspace.Channels',
        },
      },
    });
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      return null;
    }
    const workspaceMember = new WorkspaceMembers();
    workspaceMember.Workspace = workspace.id;
    workspaceMember.User = user.id;
    await this.workspaceMembersRepository.save(workspaceMember);
    const channelMember = new ChannelMembers();
    channelMember.Channel = workspace.Channels.find(
      (v) => v.name === '일반',
    ).id;
    channelMember.User = user.id;
    await this.channelMembersRepository.save(channelMember);
  }

  async getWorkspaceMember(url: string, id: number) {
    return this.usersRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .innerJoin('user.Workspaces', 'workspaces', 'workspaces.url = :url', {
        url,
      })
      .getOne();
  }
}
