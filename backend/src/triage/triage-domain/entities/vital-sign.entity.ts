// backend/src/modules/triage/entities/vital-sign.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Triage } from './triage.entity';
import { PainScale } from './pain-scale.entity';

@Entity('vital_signs')
export class VitalSign {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'triage_id', type: 'uuid' })
  triageId: string;

  @Column({ name: 'pain_scale_id', type: 'int', nullable: true })
  painScaleId: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  temperature: number;

  @Column({ name: 'heart_rate', type: 'int', nullable: true })
  heartRate: number; // Frecuencia cardíaca

  @Column({ name: 'respiratory_rate', type: 'int', nullable: true })
  respiratoryRate: number; // Frecuencia respiratoria

  @Column({ name: 'systolic_pressure', type: 'int', nullable: true })
  systolicPressure: number; // Presión arterial sistólica

  @Column({ name: 'diastolic_pressure', type: 'int', nullable: true })
  diastolicPressure: number; // Presión arterial diastólica

  @Column({ name: 'oxygen_saturation', type: 'decimal', precision: 5, scale: 2, nullable: true })
  oxygenSaturation: number; // Saturación SpO2

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  weight: number; // Peso en kg

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  height: number; // Estatura en cm

  @CreateDateColumn({ name: 'recorded_at' })
  recordedAt: Date;

  @ManyToOne(() => Triage, (triage) => triage.vitalSigns, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'triage_id' })
  triage: Triage;

  @ManyToOne(() => PainScale)
  @JoinColumn({ name: 'pain_scale_id' })
  painScale: PainScale;
}