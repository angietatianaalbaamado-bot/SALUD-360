import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Vaccine } from './vaccine.entity';

@Entity('vaccination_records')
export class VaccinationRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Referencia suelta al mÃ³dulo de Pacientes.
  @Column({ name: 'patient_id' })
  patientId: number;

  @Column({ name: 'vaccine_id' })
  vaccineId: string;

  @ManyToOne(() => Vaccine, (vaccine) => vaccine.vaccinationRecords)
  @JoinColumn({ name: 'vaccine_id' })
  vaccine: Vaccine;

  @Column({ name: 'dose_number', type: 'int', default: 1 })
  doseNumber: number;

  @Column({ name: 'application_date', type: 'timestamp' })
  applicationDate: Date;

  // Referencia suelta a quien aplicÃ³ la vacuna (personal mÃ©dico/enfermerÃ­a).
  @Column({ name: 'applied_by' })
  appliedBy: number;

  @Column({ name: 'lot_number', length: 100, nullable: true })
  lotNumber: string;
}
