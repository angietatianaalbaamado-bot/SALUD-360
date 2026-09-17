import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Disease } from './disease.entity';

export enum AllergySeverity {
  MILD = 'leve',
  MODERATE = 'moderada',
  SEVERE = 'severa',
}

@Entity('allergies')
export class Allergy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  patient_id: number;

  @ManyToOne(() => Disease, { nullable: true })
  @JoinColumn({ name: 'disease_id' })
  disease: Disease;

  @Column({ nullable: true })
  disease_id: number;

  @Column({ type: 'enum', enum: AllergySeverity, default: AllergySeverity.MILD })
  severity: AllergySeverity;

  @CreateDateColumn()
  created_at: Date;
}