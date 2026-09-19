import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, UpdateDateColumn } from 'typeorm';
import { MedicineBatch } from './medicine-batch.entity';

@Entity('inventory')
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => MedicineBatch, (b) => b.inventory, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'medicine_batch_id' })
  batch: MedicineBatch;

  @Column()
  medicine_batch_id: number;

  @Column({ default: 0 })
  quantity: number;

  @UpdateDateColumn()
  updated_at: Date;
}