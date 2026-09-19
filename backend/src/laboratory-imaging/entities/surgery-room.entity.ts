import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Procedure } from './procedure.entity';

export enum SurgeryRoomStatus {
  AVAILABLE = 'available',
  OCCUPIED = 'occupied',
  MAINTENANCE = 'maintenance',
}

@Entity('surgery_rooms')
export class SurgeryRoom {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 150, nullable: true })
  location: string;

  @Column({
    type: 'enum',
    enum: SurgeryRoomStatus,
    default: SurgeryRoomStatus.AVAILABLE,
  })
  status: SurgeryRoomStatus;

  @OneToMany(() => Procedure, (procedure) => procedure.surgeryRoom)
  procedures: Procedure[];
}
