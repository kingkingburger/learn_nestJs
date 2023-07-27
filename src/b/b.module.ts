import { Module } from '@nestjs/common';
import { BService } from './b.service';
import { BController } from './b.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { B } from './entities/b.entity';

@Module({
  imports: [TypeOrmModule.forFeature([B])],
  controllers: [BController],
  providers: [BService],
})
export class BModule {}
