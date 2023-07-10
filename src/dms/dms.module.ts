import { Module } from '@nestjs/common';
import { DmsController } from './dms.controller';
import { DMs } from '../entities/DMs';
import { DmsService } from './dms.service';

@Module({
  imports: [DMs],
  controllers: [DmsController],
  providers: [DmsService],
})
export class DmsModule {}
