// backend/src/modules/triage/entities/triage.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { TriageLevel } from './triage-level.entity';
import { VitalSign } from './vital-sign.entity';

@Entity('triages')
export class Triage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Referencia suelta al módulo de Pacientes (Regla 4)
  @Column({ name: 'patient_id', type: 'uuid' })
  patientId: string;

  // Referencia suelta al Médico o Enfermero que realiza el triage (Regla 4)
  @Column({ name: 'performed_by_user_id', type: 'uuid', nullable: true })
  performedByUserId: string;

  @Column({ name: 'triage_level_id', type: 'int' })
  triageLevelId: number;

  @Column({ name: 'chief_complaint', type: 'text' })
  chiefComplaint: string; // Motivo de consulta

  @Column({ type: 'text', nullable: true })
  observations: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relaciones DENTRO de tu propio módulo (Sí se hacen)
  @ManyToOne(() => TriageLevel)
  @JoinColumn({ name: 'triage_level_id' })
  triageLevel: TriageLevel;

  @OneToMany(() => VitalSign, (vitalSign) => vitalSign.triage)
  vitalSigns: VitalSign[];
}