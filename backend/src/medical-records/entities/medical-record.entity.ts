import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Consultation } from './consultation.entity';
import { MedicalNote } from './medical-note.entity';

@Entity('medical_records')
export class MedicalRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  patient_id: number;

  @Column()
  doctor_id: number;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Consultation, (c) => c.medicalRecord)
  consultations: Consultation[];

  @OneToMany(() => MedicalNote, (n) => n.medicalRecord)
  notes: MedicalNote[];
}