import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Users } from '../entities/Users';
import { AuthService } from './auth.service';
import { LocalSerializer } from './local.serializer';
import { LocalStrategy } from './local.strategy';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    PassportModule.register({ session: true }), // jwt 할때 false로 할 수 있습니다.
    TypeOrmModule.forFeature([Users]),
    UsersModule,
  ],
  providers: [AuthService, LocalStrategy, LocalSerializer],
})
export class AuthModule {}
