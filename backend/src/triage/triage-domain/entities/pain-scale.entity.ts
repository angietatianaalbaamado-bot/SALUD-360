// backend/src/modules/triage/entities/pain-scale.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('pain_scale')
export class PainScale {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int' })
  score: number; // Escala 0 a 10

  @Column({ type: 'varchar', length: 50 })
  description: string; // Ej: Sin dolor, Leve, Moderado, Severo, Insoportable
}