import { PartialType } from '@nestjs/swagger';
import { CreateBDto } from './create-b.dto';

export class UpdateBDto extends PartialType(CreateBDto) {}
