import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Ambulance } from './ambulance.entity';
import { AmbulanceDriver } from './ambulance-driver.entity';

@Entity('ambulance_services')
export class AmbulanceService {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'ambulance_id' })
  ambulanceId: number;

  @ManyToOne(() => Ambulance)
  @JoinColumn({ name: 'ambulance_id' })
  ambulance: Ambulance;

  @Column({ name: 'driver_id' })
  driverId: number;

  @ManyToOne(() => AmbulanceDriver)
  @JoinColumn({ name: 'driver_id' })
  driver: AmbulanceDriver;

  @Column({ name: 'service_date' })
  serviceDate: Date;

  @Column()
  origin: string;

  @Column()
  destination: string;

  @Column({ default: 'scheduled' })
  status: string;

  @Column({ type: 'text', nullable: true })
  observations: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}