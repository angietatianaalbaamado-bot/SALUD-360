import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('pharmaceutical_laboratories')
export class PharmaceuticalLaboratory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;
}