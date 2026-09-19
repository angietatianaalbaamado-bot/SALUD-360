import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('appointment_types')
export class AppointmentType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column('smallint', { default: 30 })
  default_duration_minutes: number;
}