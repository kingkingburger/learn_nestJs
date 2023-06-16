import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { UsersModule } from './users/users.module';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { ChannelsModule } from './channels/channels.module';

const getEnv = async () => {
  // const respose = await axios.get
  return {
    DB_PASSWORD: 'hello',
    NAME: 'minho',
  };
};

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [getEnv] }), UsersModule, WorkspacesModule, ChannelsModule],
  controllers: [AppController],
  providers: [
    AppService,
    ConfigService,
    {
      provide: 'CUSTOM_KEY',
      useValue: 'CUSTOM_VALUE',
    },
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
