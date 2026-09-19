import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Consultation } from './consultation.entity';

@Entity('prescriptions')
export class Prescription {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Consultation, (c) => c.prescriptions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'consultation_id' })
  consultation: Consultation;

  @Column()
  consultation_id: number;

  @Column()
  medicine_id: number;

  @Column()
  dosage: string;

  @Column('smallint')
  duration_days: number;
}