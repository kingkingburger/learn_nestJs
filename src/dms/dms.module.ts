import { Module } from '@nestjs/common';
import { DMs } from '../entities/DMs';
import { DMsController } from './dms.controller';
import { DMsService } from './dms.service';

@Module({
  imports: [DMs],
  controllers: [DMsController],
  providers: [DMsService],
})
export class DmsModule {}
