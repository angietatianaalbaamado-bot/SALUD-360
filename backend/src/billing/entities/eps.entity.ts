import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('eps')
export class Eps {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  nit: string;
}
