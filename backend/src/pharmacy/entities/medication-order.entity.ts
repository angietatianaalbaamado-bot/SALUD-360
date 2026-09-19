import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Medicine } from './medicine.entity';
import { MedicationSchedule } from './medication-schedule.entity';

@Entity('medication_orders')
export class MedicationOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  medical_record_id: number;

  @ManyToOne(() => Medicine)
  @JoinColumn({ name: 'medicine_id' })
  medicine: Medicine;

  @Column()
  medicine_id: number;

  @Column()
  dosage: string;

  @CreateDateColumn()
  ordered_at: Date;

  @OneToMany(() => MedicationSchedule, (s) => s.medicationOrder, { cascade: true })
  schedule: MedicationSchedule[];
}