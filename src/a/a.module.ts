import { Module } from '@nestjs/common';
import { AService } from './a.service';
import { AController } from './a.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { A } from './entities/a.entity';

@Module({
  imports: [TypeOrmModule.forFeature([A])],
  controllers: [AController],
  providers: [AService],
})
export class AModule {}
