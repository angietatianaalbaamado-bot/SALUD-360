import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { VaccinationRecord } from './vaccination-record.entity';

@Entity('vaccines')
export class Vaccine {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 150 })
  name: string;

  @Column({ length: 150, nullable: true })
  manufacturer: string;

  @Column({ name: 'doses_required', type: 'int', default: 1 })
  dosesRequired: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => VaccinationRecord, (record) => record.vaccine)
  vaccinationRecords: VaccinationRecord[];
}
