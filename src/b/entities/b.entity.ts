import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { A } from '../../a/entities/a.entity';
import { C } from '../../c/entities/c.entity';

@Entity({ schema: 'sleact' })
export class B {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => A, (a) => a.Bs)
  As: A[];

  @OneToMany(() => C, (c) => c.Bs)
  Cs: C[];
}

export const BAttribute = {
  id: true,
  name: true,
};
