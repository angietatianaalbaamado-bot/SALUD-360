import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EmergencyPriority } from './emergency-priority.entity';

@Entity('emergencies')
export class Emergency {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'patient_id' })
  patientId: number;

  @Column({ name: 'priority_id' })
  priorityId: number;

  @ManyToOne(() => EmergencyPriority)
  @JoinColumn({ name: 'priority_id' })
  priority: EmergencyPriority;

  @Column()
  type: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ default: 'open' })
  status: string;

  @Column({ name: 'emergencyDate' })
  emergencyDate: Date;

  @Column({ type: 'text', nullable: true })
  location: string | null;

  @Column({ type: 'text', nullable: true })
  observations: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}