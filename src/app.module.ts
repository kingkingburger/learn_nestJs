import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { UsersModule } from './users/users.module';
import { ChannelsModule } from './channels/channels.module';
import { DmsService } from './dms/dms.service';
import { DmsModule } from './dms/dms.module';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ChannelChats } from './entities/ChannelChats';
import { ChannelMembers } from './entities/ChannelMembers';
import { Channels } from './entities/Channels';
import { DMs } from './entities/DMs';
import { Mentions } from './entities/Mentions';
import { Users } from './entities/Users';
import { WorkspaceMembers } from './entities/WorkspaceMembers';
import { Workspaces } from './entities/Workspaces';
const DEFAULT_ADMIN = {
  email: 'admin@example.com',
  password: 'password',
};
const getEnv = async () => {
  // const respose = await axios.get
  return {
    DB_PASSWORD: 'hello',
    NAME: 'minho',
  };
};

const authenticate = async (email: string, password: string) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};

@Module({
  imports: [
    // AdminJS version 7 is ESM-only. In order to import it, you have to use dynamic imports.
    // import('@adminjs/nestjs').then(({ AdminModule }) =>
    //   AdminModule.createAdminAsync({
    //     useFactory: () => ({
    //       adminJsOptions: {
    //         rootPath: '/admin',
    //         resources: [],
    //       },
    //       auth: {
    //         authenticate,
    //         cookieName: 'adminjs',
    //         cookiePassword: 'secret',
    //       },
    //       sessionOptions: {
    //         resave: true,
    //         saveUninitialized: true,
    //         secret: 'secret',
    //       },
    //     }),
    //   }),
    // ),
    ConfigModule.forRoot({ isGlobal: true, load: [getEnv] }),
    UsersModule,
    WorkspacesModule,
    ChannelsModule,
    DmsModule,
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: process.env.DB_USERNAME,
    //   password: process.env.DB_PASSWORD,
    //   database: process.env.DB_DATABASE,
    //   entities: [
    //     ChannelChats,
    //     ChannelMembers,
    //     Channels,
    //     DMs,
    //     Mentions,
    //     Users,
    //     WorkspaceMembers,
    //     Workspaces,
    //   ],
    //   // autoLoadEntities: true,
    //   synchronize: false,
    //   logging: true,
    //   // keepConnectionAlive: true,
    // }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService,
      ): Promise<TypeOrmModuleOptions> => {
        return {
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: configService.getOrThrow('DB_USERNAME'),
          password: configService.getOrThrow('DB_PASSWORD'),
          database: configService.getOrThrow('DB_DATABASE'),
          entities: [
            ChannelChats,
            ChannelMembers,
            Channels,
            DMs,
            Mentions,
            Users,
            WorkspaceMembers,
            Workspaces,
          ],
          // autoLoadEntities: true,
          synchronize: true,
          logging: true,
          // keepConnectionAlive: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ConfigService,
    {
      provide: 'CUSTOM_KEY',
      useValue: 'CUSTOM_VALUE',
    },
    DmsService,
  ],
  // providers: [
  //   {
  //     provide: AppService,
  //     // useClass: AppService,
  //     // useFactory: () => {
  //     //   //작업중
  //     //   return {
  //     //     a: 'b',
  //     //   };
  //     // },
  //   },
  //   ConfigService,
  // ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
