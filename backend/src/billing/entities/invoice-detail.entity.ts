import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Invoice } from './invoice.entity';

@Entity('invoice_details')
export class InvoiceDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Invoice, (invoice) => invoice.details, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'invoice_id' })
  invoice: Invoice;

  @Column()
  invoice_id: number;

  @Column()
  concept: string;

  @Column('decimal', { precision: 12, scale: 2 })
  amount: number;
}
