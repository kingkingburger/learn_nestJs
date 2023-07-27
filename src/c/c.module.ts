import { Module } from '@nestjs/common';
import { CService } from './c.service';
import { CController } from './c.controller';

@Module({
  controllers: [CController],
  providers: [CService]
})
export class CModule {}
