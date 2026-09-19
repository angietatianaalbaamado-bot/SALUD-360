import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LaboratoryResult } from './laboratory-result.entity';

export enum LaboratoryOrderStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Entity('laboratory_orders')
export class LaboratoryOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Referencia suelta: el mÃ³dulo de Pacientes aÃºn no existe.
  // Cuando el equipo decida conectar relaciones reales, esto pasa a @ManyToOne.
  @Column({ name: 'patient_id' })
  patientId: number;

  // Referencia suelta al mÃ©dico que ordena el examen (mÃ³dulo de Personal MÃ©dico).
  @Column({ name: 'doctor_id' })
  doctorId: number;

  @CreateDateColumn({ name: 'order_date' })
  orderDate: Date;

  @Column({
    type: 'enum',
    enum: LaboratoryOrderStatus,
    default: LaboratoryOrderStatus.PENDING,
  })
  status: LaboratoryOrderStatus;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @OneToMany(() => LaboratoryResult, (result) => result.order)
  results: LaboratoryResult[];
}
