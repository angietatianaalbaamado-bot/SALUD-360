import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Inventory } from './inventory.entity';

export enum MovementType {
  ENTRADA = 'entrada',
  SALIDA = 'salida',
  AJUSTE = 'ajuste',
}

@Entity('inventory_movements')
export class InventoryMovement {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Inventory, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'inventory_id' })
  inventory: Inventory;

  @Column()
  inventory_id: number;

  @Column({ type: 'enum', enum: MovementType })
  movement_type: MovementType;

  @Column()
  quantity: number;

  @CreateDateColumn()
  created_at: Date;
}