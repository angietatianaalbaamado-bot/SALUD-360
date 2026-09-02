import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { City } from '../../billing/entities/city.entity';
import { Country } from '../../billing/entities/country.entity';
import { Department } from '../../billing/entities/department.entity';
import { Patient } from './patient.entity';

@Entity('patient_addresses')
@Index('uq_patient_primary_address', ['patient_id'], {
  unique: true,
  where: 'is_primary = true',
})
export class PatientAddress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  patient_id: number;

  @ManyToOne(() => Patient, (patient) => patient.addresses, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;

  @Column()
  country_id: number;

  @ManyToOne(() => Country, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'country_id' })
  country: Country;

  @Column()
  department_id: number;

  @ManyToOne(() => Department, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'department_id' })
  department: Department;

  @Column()
  city_id: number;

  @ManyToOne(() => City, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'city_id' })
  city: City;

  @Column({ length: 250 })
  address: string;

  @Column({ length: 120, nullable: true })
  neighborhood?: string;

  @Column({ length: 20, nullable: true })
  postal_code?: string;

  @Column({ default: false })
  is_primary: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
