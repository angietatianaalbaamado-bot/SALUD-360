import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { DocumentType } from '../../billing/entities/document-type.entity';
import { DoctorAvailability } from './doctor-availability.entity';
import { DoctorSchedule } from './doctor-schedule.entity';
import { DoctorSpecialty } from './doctor-specialty.entity';

@Entity('doctors')
@Unique('uq_doctors_user', ['user_id'])
@Unique('uq_doctors_document', ['document_type_id', 'document_number'])
@Unique('uq_doctors_medical_license', ['medical_license'])
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  // Se convertira en relacion cuando Seguridad publique la entidad User.
  @Column({ nullable: true })
  user_id?: number;

  @Column()
  document_type_id: number;

  @ManyToOne(() => DocumentType, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'document_type_id' })
  document_type: DocumentType;

  @Column({ length: 30 })
  document_number: string;

  @Column({ length: 80 })
  medical_license: string;

  @Column({ length: 100 })
  first_name: string;

  @Column({ length: 100, nullable: true })
  middle_name?: string;

  @Column({ length: 100 })
  last_name: string;

  @Column({ length: 100, nullable: true })
  second_last_name?: string;

  @Column({ length: 30, nullable: true })
  phone?: string;

  @Column({ length: 254, nullable: true })
  email?: string;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @OneToMany(() => DoctorSpecialty, (doctorSpecialty) => doctorSpecialty.doctor)
  doctor_specialties: DoctorSpecialty[];

  @OneToMany(() => DoctorSchedule, (schedule) => schedule.doctor)
  schedules: DoctorSchedule[];

  @OneToMany(() => DoctorAvailability, (availability) => availability.doctor)
  availabilities: DoctorAvailability[];
}
