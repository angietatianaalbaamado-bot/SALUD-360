import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { MedicalRecord } from './medical-record.entity';
import { Diagnosis } from './diagnosis.entity';
import { Prescription } from './prescription.entity';

@Entity('consultations')
export class Consultation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => MedicalRecord, (mr) => mr.consultations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'medical_record_id' })
  medicalRecord: MedicalRecord;

  @Column()
  medical_record_id: number;

  @Column({ nullable: true })
  appointment_id: number;

  @Column()
  reason: string;

  @Column('text', { nullable: true })
  notes: string;

  @CreateDateColumn()
  consultation_date: Date;

  @OneToMany(() => Diagnosis, (d) => d.consultation, { cascade: true })
  diagnoses: Diagnosis[];

  @OneToMany(() => Prescription, (p) => p.consultation, { cascade: true })
  prescriptions: Prescription[];
}