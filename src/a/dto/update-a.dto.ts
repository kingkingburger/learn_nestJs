import { PartialType } from '@nestjs/swagger';
import { CreateADto } from './create-a.dto';

export class UpdateADto extends PartialType(CreateADto) {}
