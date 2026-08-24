import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Patient } from './patient.entity';

@Entity('patient_photos')
@Index('uq_patient_current_photo', ['patient_id'], {
  unique: true,
  where: 'is_current = true',
})
export class PatientPhoto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  patient_id: number;

  @ManyToOne(() => Patient, (patient) => patient.photos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;

  @Column({ type: 'text' })
  file_url: string;

  @Column({ default: true })
  is_current: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
}
