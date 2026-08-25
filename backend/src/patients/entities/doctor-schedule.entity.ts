import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Doctor } from './doctor.entity';

@Entity('doctor_schedule')
@Index('idx_doctor_schedule_doctor_day', ['doctor_id', 'day_of_week'])
@Check('chk_doctor_schedule_day', 'day_of_week BETWEEN 0 AND 6')
@Check('chk_doctor_schedule_time', 'end_time > start_time')
@Check('chk_doctor_schedule_slot', 'slot_duration_minutes > 0')
export class DoctorSchedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  doctor_id: number;

  @ManyToOne(() => Doctor, (doctor) => doctor.schedules, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'doctor_id' })
  doctor: Doctor;

  @Column({ type: 'smallint' })
  day_of_week: number;

  @Column({ type: 'time' })
  start_time: string;

  @Column({ type: 'time' })
  end_time: string;

  @Column({ type: 'smallint', default: 30 })
  slot_duration_minutes: number;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
