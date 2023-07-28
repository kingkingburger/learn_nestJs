import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { B } from '../../b/entities/b.entity';
import { C } from '../../c/entities/c.entity';

@Entity({ schema: 'sleact' })
export class A {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => B, (b) => b.As)
  @JoinTable({
    name: 'c',
    joinColumn: {
      name: 'AId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'BId',
      referencedColumnName: 'id',
    },
  })
  Bs: B[];

  @OneToMany(() => C, (c) => c.As)
  Cs: C[];
}
