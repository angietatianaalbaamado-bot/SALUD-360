import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Doctor } from './doctor.entity';
import { Specialty } from './specialty.entity';

@Entity('doctor_specialties')
@Unique('uq_doctor_specialties', ['doctor_id', 'specialty_id'])
@Index('uq_doctor_primary_specialty', ['doctor_id'], {
  unique: true,
  where: 'is_primary = true',
})
export class DoctorSpecialty {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  doctor_id: number;

  @ManyToOne(() => Doctor, (doctor) => doctor.doctor_specialties, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'doctor_id' })
  doctor: Doctor;

  @Column()
  specialty_id: number;

  @ManyToOne(() => Specialty, (specialty) => specialty.doctor_specialties, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'specialty_id' })
  specialty: Specialty;

  @Column({ default: false })
  is_primary: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
}
