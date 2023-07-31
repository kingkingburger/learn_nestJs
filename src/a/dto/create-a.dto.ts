import { PickType } from '@nestjs/swagger';
import { A } from '../entities/a.entity';
import { B } from '../../b/entities/b.entity';

export class CreateADto extends PickType(A, ['name']) {
  Bs: B[];
}
