import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Medicine } from './medicine.entity';
import { Inventory } from './inventory.entity';

@Entity('medicine_batches')
export class MedicineBatch {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Medicine, (m) => m.batches, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'medicine_id' })
  medicine: Medicine;

  @Column()
  medicine_id: number;

  @Column()
  batch_number: string;

  @Column('date')
  expiration_date: string;

  @OneToMany(() => Inventory, (i) => i.batch)
  inventory: Inventory[];
}