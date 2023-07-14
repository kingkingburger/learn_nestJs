import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from 'src/app.module';
import session from 'express-session';
import passport from 'passport';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // app.use(
    //   session({
    //     resave: false,
    //     saveUninitialized: false,
    //     secret: process.env.COOKIE_SECRET,
    //     cookie: {
    //       httpOnly: true,
    //     },
    //   }),
    // );
    // app.use(passport.initialize());
    // app.use(passport.session());
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect('Hello World!')
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });

  // it('/api/user/login)', () => {
  //   return request(app.getHttpServer())
  //     .post('/api/users/login')
  //     .send({ email: 'minho@gmail.com', password: '1234' })
  //     .expect(200)
  //     .expect('Hello World!');
  // });
});
