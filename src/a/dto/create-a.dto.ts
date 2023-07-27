import { PickType } from '@nestjs/swagger';
import { A } from '../entities/a.entity';

export class CreateADto extends PickType(A, ['name']) {}
