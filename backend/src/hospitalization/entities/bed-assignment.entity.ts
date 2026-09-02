import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Hospitalization } from './hospitalization.entity';
import { Bed } from './bed.entity';

@Entity('bed_assignments')
export class BedAssignment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'hospitalization_id' })
  hospitalizationId: number;

  @ManyToOne(() => Hospitalization)
  @JoinColumn({ name: 'hospitalization_id' })
  hospitalization: Hospitalization;

  @Column({ name: 'bed_id' })
  bedId: number;

  @ManyToOne(() => Bed)
  @JoinColumn({ name: 'bed_id' })
  bed: Bed;

  @Column({ name: 'assigned_at' })
  assignedAt: Date;

  @Column({
    name: 'released_at',
    type: 'timestamp',
    nullable: true,
  })
  releasedAt: Date | null;

  @Column({ default: 'active' })
  status: string;

  @Column({ type: 'text', nullable: true })
  observations: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}