import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { MedicationSchedule } from './medication-schedule.entity';

@Entity('medication_administration')
export class MedicationAdministration {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => MedicationSchedule, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'medication_schedule_id' })
  medicationSchedule: MedicationSchedule;

  @Column()
  medication_schedule_id: number;

  @Column()
  administered_by: number;

  @CreateDateColumn()
  administered_at: Date;
}