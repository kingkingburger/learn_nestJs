import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { A } from '../../a/entities/a.entity';
import { B } from '../../b/entities/b.entity';

@Entity({ schema: 'sleact' })
export class C {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => A, (a) => a.Cs)
  As: A[];

  @ManyToOne(() => B, (b) => b.Cs)
  Bs: B[];
}
