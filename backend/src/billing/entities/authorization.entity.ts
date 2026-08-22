import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Eps } from './eps.entity';

export enum AuthorizationStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity('authorizations')
export class Authorization {
  @PrimaryGeneratedColumn()
  id: number;

  // Relación lógica con patients (módulo de Pacientes y Médicos)
  @Column()
  patient_id: number;

  @ManyToOne(() => Eps)
  @JoinColumn({ name: 'eps_id' })
  eps: Eps;

  @Column()
  eps_id: number;

  // Relación lógica con procedures (módulo de Laboratorio e Imágenes)
  @Column({ nullable: true })
  procedure_id: number;

  @Column({ type: 'enum', enum: AuthorizationStatus, default: AuthorizationStatus.PENDING })
  status: AuthorizationStatus;

  @CreateDateColumn()
  authorized_at: Date;
}
