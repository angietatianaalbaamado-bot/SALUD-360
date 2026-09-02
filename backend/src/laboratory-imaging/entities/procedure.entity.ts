import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProcedureType } from './procedure-type.entity';
import { SurgeryRoom } from './surgery-room.entity';

export enum ProcedureStatus {
  SCHEDULED = 'scheduled',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Entity('procedures')
export class Procedure {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Referencia suelta al mÃ³dulo de Pacientes.
  @Column({ name: 'patient_id' })
  patientId: number;

  // Referencia suelta al mÃ©dico responsable.
  @Column({ name: 'doctor_id' })
  doctorId: number;

  @Column({ name: 'procedure_type_id' })
  procedureTypeId: string;

  @ManyToOne(() => ProcedureType, (type) => type.procedures)
  @JoinColumn({ name: 'procedure_type_id' })
  procedureType: ProcedureType;

  @Column({ name: 'surgery_room_id', nullable: true })
  surgeryRoomId: string;

  @ManyToOne(() => SurgeryRoom, (room) => room.procedures, { nullable: true })
  @JoinColumn({ name: 'surgery_room_id' })
  surgeryRoom: SurgeryRoom;

  @Column({ name: 'procedure_date', type: 'timestamp' })
  procedureDate: Date;

  @Column({
    type: 'enum',
    enum: ProcedureStatus,
    default: ProcedureStatus.SCHEDULED,
  })
  status: ProcedureStatus;

  @Column({ type: 'text', nullable: true })
  notes: string;
}
