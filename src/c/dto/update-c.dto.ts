import { PartialType } from '@nestjs/swagger';
import { CreateCDto } from './create-c.dto';

export class UpdateCDto extends PartialType(CreateCDto) {}
