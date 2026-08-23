import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Eps } from './eps.entity';

@Entity('insurance_plans')
export class InsurancePlan {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Eps)
  @JoinColumn({ name: 'eps_id' })
  eps: Eps;

  @Column()
  eps_id: number;

  @Column()
  name: string;
}
