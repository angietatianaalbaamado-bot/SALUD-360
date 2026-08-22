import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { InvoiceDetail } from './invoice-detail.entity';
import { Payment } from './payment.entity';

export enum InvoiceStatus {
  PENDING = 'pending',
  PAID = 'paid',
  CANCELLED = 'cancelled',
  PARTIAL = 'partial',
}

@Entity('invoices')
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  // Relación lógica con patients (módulo de Pacientes y Médicos)
  @Column()
  patient_id: number;

  @Column('decimal', { precision: 12, scale: 2 })
  total: number;

  @Column({ type: 'enum', enum: InvoiceStatus, default: InvoiceStatus.PENDING })
  status: InvoiceStatus;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => InvoiceDetail, (detail) => detail.invoice, { cascade: true })
  details: InvoiceDetail[];

  @OneToMany(() => Payment, (payment) => payment.invoice)
  payments: Payment[];
}
