import { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './common/logger/logger.middleware';
import { UsersModule } from './users/users.module';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { ChannelsModule } from './channels/channels.module';
import { ChannelChats } from './entities/ChannelChats';
import { ChannelMembers } from './entities/ChannelMembers';
import { Channels } from './entities/Channels';
import { DMs } from './entities/DMs';
import { Mentions } from './entities/Mentions';
import { Users } from './entities/Users';
import { WorkspaceMembers } from './entities/WorkspaceMembers';
import { Workspaces } from './entities/Workspaces';
import { DMsModule } from './dms/DMsModule';
import { AModule } from './a/a.module';
import { BModule } from './b/b.module';
import { B } from './b/entities/b.entity';
import { A } from './a/entities/a.entity';
import { CModule } from './c/c.module';
import { C } from './c/entities/c.entity';
import { utilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { transports } from 'winston';
import dayjs from 'dayjs';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      entities: [
        ChannelChats,
        ChannelMembers,
        Channels,
        DMs,
        Mentions,
        Users,
        WorkspaceMembers,
        Workspaces,
        A,
        B,
        C,
      ],
      keepConnectionAlive: true,
      migrations: [__dirname + '/migrations/*.ts'],
      synchronize: true,
      logging: true,
    }),
    WinstonModule.forRoot({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.prettyPrint(),
      ),
      transports: [
        new winston.transports.Console({
          level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp(),
            utilities.format.nestLike('MyApp', { prettyPrint: true }),
          ),
        }),
        new transports.File({
          level: 'error',
          filename: `error-${dayjs().format('YYYY-MM-DD')}.log`,
          dirname: 'logs',
          maxsize: 5000000,
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp(),
            utilities.format.nestLike('MyApp', { prettyPrint: true }),
          ),
        }),
        new transports.File({
          filename: `application-${dayjs().format('YYYY-MM-DD')}.log`,
          dirname: 'logs',
          maxsize: 5000000,
          format: winston.format.combine(
            winston.format.timestamp({ format: 'isoDateTime' }),
            // printf((info) => {
            //   return `${dayjs().format("YYYY-MM-DD-HH-HH")}${info.message}`;
            // })
            winston.format.prettyPrint(),
          ),
        }),
      ],
    }),
    AuthModule,
    UsersModule,
    WorkspacesModule,
    ChannelsModule,
    DMsModule,
    AModule,
    BModule,
    CModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
