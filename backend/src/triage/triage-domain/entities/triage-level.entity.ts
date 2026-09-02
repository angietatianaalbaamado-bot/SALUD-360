// backend/src/modules/triage/entities/triage-level.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('triage_levels')
export class TriageLevel {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  name: string; // Ej: Resucitación (Rojo), Emergencia (Naranja), Urgencia (Amarillo)...

  @Column({ type: 'varchar', length: 20, nullable: true })
  color: string; // Ej: #FF0000

  @Column({ name: 'max_waiting_time_minutes', type: 'int', nullable: true })
  maxWaitingTimeMinutes: number;

  @Column({ type: 'text', nullable: true })
  description: string;
}