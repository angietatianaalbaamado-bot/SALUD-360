import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Disease } from './disease.entity';

@Entity('chronic_conditions')
export class ChronicCondition {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  patient_id: number;

  @ManyToOne(() => Disease, { nullable: true })
  @JoinColumn({ name: 'disease_id' })
  disease: Disease;

  @Column({ nullable: true })
  disease_id: number;

  @Column('date')
  diagnosed_at: string;

  @CreateDateColumn()
  created_at: Date;
}