import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Eps } from '../../billing/entities/eps.entity';
import { InsurancePlan } from '../../billing/entities/insurance-plan.entity';
import { Patient } from './patient.entity';

@Entity('patient_insurance')
@Unique('uq_patient_insurance_membership', ['eps_id', 'membership_number'])
@Index('uq_patient_primary_insurance', ['patient_id'], {
  unique: true,
  where: 'is_primary = true AND is_active = true',
})
@Check(
  'chk_patient_insurance_dates',
  'valid_until IS NULL OR valid_from IS NULL OR valid_until >= valid_from',
)
export class PatientInsurance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  patient_id: number;

  @ManyToOne(() => Patient, (patient) => patient.insurances, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;

  @Column()
  eps_id: number;

  @ManyToOne(() => Eps, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'eps_id' })
  eps: Eps;

  @Column({ nullable: true })
  insurance_plan_id?: number;

  @ManyToOne(() => InsurancePlan, { nullable: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'insurance_plan_id' })
  insurance_plan?: InsurancePlan;

  @Column({ length: 80 })
  membership_number: string;

  @Column({ type: 'date', nullable: true })
  valid_from?: string;

  @Column({ type: 'date', nullable: true })
  valid_until?: string;

  @Column({ default: false })
  is_primary: boolean;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
