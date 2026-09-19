import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { MedicalRecord } from './medical-record.entity';

@Entity('medical_notes')
export class MedicalNote {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => MedicalRecord, (mr) => mr.notes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'medical_record_id' })
  medicalRecord: MedicalRecord;

  @Column()
  medical_record_id: number;

  @Column('text')
  note: string;

  @CreateDateColumn()
  created_at: Date;
}