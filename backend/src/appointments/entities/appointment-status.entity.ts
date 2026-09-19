import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('appointment_status')
export class AppointmentStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;
}