import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UndefinedToNullInterceptor } from './common/interceptors/undefinedToNull.interceptor';
import { TypeORMExceptionFilter } from './common/filter/typeormException.filter';
import { HttpExceptionFilter } from './common/filter/httpException.filter';
import { AllExceptionFilter } from './common/filter/allException.filter';
import { ValidationPipe } from '@nestjs/common';
import passport from 'passport';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 앱 전역에서 interceptor 쓰고 싶을 때
  // app.useGlobalInterceptors(new UndefinedToNullInterceptor());
  // app.useGlobalFilters(new TypeORMExceptionFilter());
  app.useGlobalPipes(new ValidationPipe()); // validate 검사기
  app.useGlobalFilters(new HttpExceptionFilter()); // httpException 검사기
  const port = process.env.PORT || 3000;

  const config = new DocumentBuilder()
    .setTitle('Sleact API')
    .setDescription('Sleact 개발을 위한 API 문서입니다.')
    .setVersion('1.0.0')
    .addCookieAuth('connect.sid')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // app.use(passport.initialize()); // passport 설정
  // app.use(passport.session()); // passport 설정
  await app.listen(port);
  console.log(`listening on port ${port}`);

  // 핫 리로딩 적용
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
