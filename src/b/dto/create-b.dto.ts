import { PickType } from '@nestjs/swagger';
import { A } from '../../a/entities/a.entity';

export class CreateBDto extends PickType(A, ['name']) {}
