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
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { User } from '../../auth/entities/user.entity';
import { DocumentType } from '../../billing/entities/document-type.entity';
import { DoctorAvailability } from './doctor-availability.entity';
import { DoctorSchedule } from './doctor-schedule.entity';
import { DoctorSpecialty } from './doctor-specialty.entity';

@Entity('doctors')
@Unique('uq_doctors_user', ['user_id'])
@Unique('uq_doctors_document', ['document_type_id', 'document_number'])
@Unique('uq_doctors_medical_license', ['medical_license'])
export class Doctor {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiPropertyOptional({ type: Number, nullable: true, example: 1 })
  @Column({ type: 'integer', nullable: true })
  user_id?: number | null;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'user_id', foreignKeyConstraintName: 'fk_doctors_user' })
  user?: User | null;

  @ApiProperty({ example: 1 })
  @Column()
  document_type_id: number;

  @ManyToOne(() => DocumentType, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'document_type_id' })
  document_type: DocumentType;

  @ApiProperty({ example: '1020304050' })
  @Column({ length: 30 })
  document_number: string;

  @ApiProperty({ example: 'RM-12345' })
  @Column({ length: 80 })
  medical_license: string;

  @ApiProperty({ example: 'Ana' })
  @Column({ length: 100 })
  first_name: string;

  @ApiPropertyOptional({ type: String, nullable: true })
  @Column({ type: 'varchar', length: 100, nullable: true })
  middle_name?: string | null;

  @ApiProperty({ example: 'Gómez' })
  @Column({ length: 100 })
  last_name: string;

  @ApiPropertyOptional({ type: String, nullable: true })
  @Column({ type: 'varchar', length: 100, nullable: true })
  second_last_name?: string | null;

  @ApiPropertyOptional({ type: String, nullable: true })
  @Column({ type: 'varchar', length: 30, nullable: true })
  phone?: string | null;

  @ApiPropertyOptional({ type: String, nullable: true })
  @Column({ type: 'varchar', length: 254, nullable: true })
  email?: string | null;

  @ApiProperty({ example: true })
  @Column({ default: true })
  is_active: boolean;

  @ApiProperty({ type: String, format: 'date-time' })
  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @ApiProperty({ type: String, format: 'date-time' })
  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @OneToMany(() => DoctorSpecialty, (doctorSpecialty) => doctorSpecialty.doctor)
  doctor_specialties: DoctorSpecialty[];

  @OneToMany(() => DoctorSchedule, (schedule) => schedule.doctor)
  schedules: DoctorSchedule[];

  @OneToMany(() => DoctorAvailability, (availability) => availability.doctor)
  availabilities: DoctorAvailability[];
}
