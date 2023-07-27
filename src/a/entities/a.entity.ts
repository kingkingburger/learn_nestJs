import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { B } from '../../b/entities/b.entity';

@Entity({ schema: 'sleact' })
export class A {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => B, (b) => b.As)
  @JoinTable({
    name: 'ab',
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
}
