import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ImagingType } from './imaging-type.entity';
import { ImagingResult } from './imaging-result.entity';

export enum ImagingOrderStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Entity('imaging_orders')
export class ImagingOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Referencia suelta al mÃ³dulo de Pacientes.
  @Column({ name: 'patient_id' })
  patientId: number;

  // Referencia suelta al mÃ©dico que ordena el estudio.
  @Column({ name: 'doctor_id' })
  doctorId: number;

  @Column({ name: 'imaging_type_id' })
  imagingTypeId: string;

  @ManyToOne(() => ImagingType, (type) => type.orders)
  @JoinColumn({ name: 'imaging_type_id' })
  imagingType: ImagingType;

  @CreateDateColumn({ name: 'order_date' })
  orderDate: Date;

  @Column({
    type: 'enum',
    enum: ImagingOrderStatus,
    default: ImagingOrderStatus.PENDING,
  })
  status: ImagingOrderStatus;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @OneToMany(() => ImagingResult, (result) => result.order)
  results: ImagingResult[];
}
