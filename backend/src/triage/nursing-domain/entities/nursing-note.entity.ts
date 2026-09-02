// backend/src/modules/triage/entities/nursing-note.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('nursing_notes')
export class NursingNote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Referencias sueltas (Regla 4)
  @Column({ name: 'patient_id', type: 'uuid' })
  patientId: string;

  @Column({ name: 'nurse_id', type: 'uuid' })
  nurseId: string;

  @Column({ type: 'text' })
  note: string; // Observaciones de la enfermera/o

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}