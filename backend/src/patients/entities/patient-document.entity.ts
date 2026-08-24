import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { DocumentType } from '../../billing/entities/document-type.entity';
import { Patient } from './patient.entity';

@Entity('patient_documents')
@Unique('uq_patient_documents_file', ['patient_id', 'document_type_id', 'file_url'])
export class PatientDocument {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  patient_id: number;

  @ManyToOne(() => Patient, (patient) => patient.documents, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;

  @Column()
  document_type_id: number;

  @ManyToOne(() => DocumentType, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'document_type_id' })
  document_type: DocumentType;

  @Column({ type: 'text' })
  file_url: string;

  @CreateDateColumn({ type: 'timestamptz' })
  uploaded_at: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
