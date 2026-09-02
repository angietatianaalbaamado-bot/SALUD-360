import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LaboratoryOrder } from './laboratory-order.entity';
import { LaboratoryTest } from './laboratory-test.entity';

@Entity('laboratory_results')
export class LaboratoryResult {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'order_id' })
  orderId: string;

  @ManyToOne(() => LaboratoryOrder, (order) => order.results)
  @JoinColumn({ name: 'order_id' })
  order: LaboratoryOrder;

  @Column({ name: 'test_id' })
  testId: string;

  @ManyToOne(() => LaboratoryTest, (test) => test.results)
  @JoinColumn({ name: 'test_id' })
  test: LaboratoryTest;

  @Column({ name: 'result_value', length: 255, nullable: true })
  resultValue: string;

  @Column({ length: 30, nullable: true })
  unit: string;

  @Column({ name: 'is_abnormal', default: false })
  isAbnormal: boolean;

  @Column({ name: 'result_date', type: 'timestamp', nullable: true })
  resultDate: Date;

  @Column({ type: 'text', nullable: true })
  notes: string;
}
