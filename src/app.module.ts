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
    import('@adminjs/nestjs').then(({ AdminModule }) =>
      AdminModule.createAdminAsync({
        useFactory: () => ({
          adminJsOptions: {
            rootPath: '/admin',
            resources: [],
          },
          auth: {
            authenticate,
            cookieName: 'adminjs',
            cookiePassword: 'secret',
          },
          sessionOptions: {
            resave: true,
            saveUninitialized: true,
            secret: 'secret',
          },
        }),
      }),
    ),
    ConfigModule.forRoot({ isGlobal: true, load: [getEnv] }),
    UsersModule,
    WorkspacesModule,
    ChannelsModule,
    DmsModule,
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
