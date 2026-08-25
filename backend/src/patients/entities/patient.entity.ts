import {
  Check,
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
import { BloodType } from '../../billing/entities/blood-type.entity';
import { DocumentType } from '../../billing/entities/document-type.entity';
import { Gender } from '../../billing/entities/gender.entity';
import { MaritalStatus } from '../../billing/entities/marital-status.entity';
import { PatientAddress } from './patient-address.entity';
import { PatientContact } from './patient-contact.entity';
import { PatientDocument } from './patient-document.entity';
import { PatientInsurance } from './patient-insurance.entity';
import { PatientPhoto } from './patient-photo.entity';

@Entity('patients')
@Unique('uq_patients_document', ['document_type_id', 'document_number'])
@Check('chk_patients_birth_date', 'birth_date <= CURRENT_DATE')
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  document_type_id: number;

  @ManyToOne(() => DocumentType, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'document_type_id' })
  document_type: DocumentType;

  @Column({ length: 30 })
  document_number: string;

  @Column({ length: 100 })
  first_name: string;

  @Column({ length: 100, nullable: true })
  middle_name?: string;

  @Column({ length: 100 })
  last_name: string;

  @Column({ length: 100, nullable: true })
  second_last_name?: string;

  @Column({ type: 'date' })
  birth_date: string;

  @Column()
  gender_id: number;

  @ManyToOne(() => Gender, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'gender_id' })
  gender: Gender;

  @Column({ nullable: true })
  blood_type_id?: number;

  @ManyToOne(() => BloodType, { nullable: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'blood_type_id' })
  blood_type?: BloodType;

  @Column({ nullable: true })
  marital_status_id?: number;

  @ManyToOne(() => MaritalStatus, { nullable: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'marital_status_id' })
  marital_status?: MaritalStatus;

  @Column({ length: 254, nullable: true })
  email?: string;

  @Column({ length: 30, nullable: true })
  phone?: string;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @OneToMany(() => PatientContact, (contact) => contact.patient)
  contacts: PatientContact[];

  @OneToMany(() => PatientAddress, (address) => address.patient)
  addresses: PatientAddress[];

  @OneToMany(() => PatientDocument, (document) => document.patient)
  documents: PatientDocument[];

  @OneToMany(() => PatientPhoto, (photo) => photo.patient)
  photos: PatientPhoto[];

  @OneToMany(() => PatientInsurance, (insurance) => insurance.patient)
  insurances: PatientInsurance[];
}
