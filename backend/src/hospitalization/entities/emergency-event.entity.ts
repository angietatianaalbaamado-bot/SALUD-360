import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Emergency } from './emergency.entity';

@Entity('emergency_events')
export class EmergencyEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'emergency_id' })
  emergencyId: number;

  @ManyToOne(() => Emergency)
  @JoinColumn({ name: 'emergency_id' })
  emergency: Emergency;

  @Column({ name: 'event_type' })
  eventType: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ name: 'event_date' })
  eventDate: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}