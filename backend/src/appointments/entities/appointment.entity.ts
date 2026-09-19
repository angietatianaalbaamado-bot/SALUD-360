import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AppointmentType } from './appointment-type.entity';
import { AppointmentStatus } from './appointment-status.entity';

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  patient_id: number;

  @Column()
  doctor_id: number;

  @ManyToOne(() => AppointmentType)
  @JoinColumn({ name: 'appointment_type_id' })
  appointmentType: AppointmentType;

  @Column()
  appointment_type_id: number;

  @ManyToOne(() => AppointmentStatus)
  @JoinColumn({ name: 'appointment_status_id' })
  appointmentStatus: AppointmentStatus;

  @Column()
  appointment_status_id: number;

  @Column()
  scheduled_at: Date;

  @Column({ nullable: true })
  reason: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}