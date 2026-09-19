import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { MedicationOrder } from './medication-order.entity';

@Entity('medication_schedule')
export class MedicationSchedule {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => MedicationOrder, (o) => o.schedule, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'medication_order_id' })
  medicationOrder: MedicationOrder;

  @Column()
  medication_order_id: number;

  @Column()
  scheduled_time: Date;
}