import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Procedure } from './procedure.entity';

@Entity('procedure_types')
export class ProcedureType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 150 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ name: 'estimated_duration', type: 'int', nullable: true })
  estimatedDuration: number; // minutos

  @Column({ name: 'requires_surgery_room', default: false })
  requiresSurgeryRoom: boolean;

  @OneToMany(() => Procedure, (procedure) => procedure.procedureType)
  procedures: Procedure[];
}
