import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Diagnosis } from './diagnosis.entity';

@Entity('treatments')
export class Treatment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Diagnosis, (d) => d.treatments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'diagnosis_id' })
  diagnosis: Diagnosis;

  @Column()
  diagnosis_id: number;

  @Column('text')
  description: string;

  @Column('date')
  start_date: string;

  @Column('date', { nullable: true })
  end_date: string;
}