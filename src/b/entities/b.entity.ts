import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { A } from '../../a/entities/a.entity';

@Entity({ schema: 'sleact' })
export class B {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => A, (a) => a.Bs)
  As: A[];
}
