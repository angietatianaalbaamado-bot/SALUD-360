import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('hospitalizations')
export class Hospitalization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'patient_id' })
  patientId: number;

  @Column({ name: 'admission_date' })
  admissionDate: Date;

  @Column({
    name: 'discharge_date',
    type: 'timestamp',
    nullable: true,
  })
  dischargeDate: Date | null;

  @Column({ type: 'text' })
  reason: string;

  @Column({ type: 'text', nullable: true })
  diagnosis: string | null;

  @Column({ default: 'active' })
  status: string;

  @Column({ type: 'text', nullable: true })
  observations: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}