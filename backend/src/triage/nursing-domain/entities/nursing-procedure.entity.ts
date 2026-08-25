// backend/src/modules/triage/entities/nursing-procedure.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('nursing_procedures')
export class NursingProcedure {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Referencias sueltas (Regla 4)
  @Column({ name: 'patient_id', type: 'uuid' })
  patientId: string;

  @Column({ name: 'nurse_id', type: 'uuid' })
  nurseId: string;

  @Column({ name: 'procedure_name', type: 'varchar', length: 150 })
  procedureName: string; // Ej: Lavado de herida, Curación, Colocación de vía

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn({ name: 'performed_at' })
  performedAt: Date;
}