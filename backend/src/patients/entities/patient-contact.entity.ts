import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Patient } from './patient.entity';

@Entity('patient_contacts')
export class PatientContact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  patient_id: number;

  @ManyToOne(() => Patient, (patient) => patient.contacts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;

  @Column({ length: 200 })
  full_name: string;

  @Column({ length: 80 })
  relationship: string;

  @Column({ length: 30 })
  phone: string;

  @Column({ length: 254, nullable: true })
  email?: string;

  @Column({ default: false })
  is_emergency_contact: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
