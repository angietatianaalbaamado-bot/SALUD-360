// backend/src/modules/triage/entities/nursing-shift.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('nursing_shift')
export class NursingShift {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Referencia suelta (Regla 4)
  @Column({ name: 'nurse_id', type: 'uuid' })
  nurseId: string;

  @Column({ name: 'shift_type', type: 'varchar', length: 50 })
  shiftType: string; // Ej: Mañana, Tarde, Noche

  @Column({ name: 'start_time', type: 'timestamp' })
  startTime: Date;

  @Column({ name: 'end_time', type: 'timestamp' })
  endTime: Date;

  @Column({ type: 'text', nullable: true })
  observations: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}