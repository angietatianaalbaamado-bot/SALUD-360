import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ImagingOrder } from './imaging-order.entity';

@Entity('imaging_results')
export class ImagingResult {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'order_id' })
  orderId: string;

  @ManyToOne(() => ImagingOrder, (order) => order.results)
  @JoinColumn({ name: 'order_id' })
  order: ImagingOrder;

  @Column({ name: 'result_date', type: 'timestamp', nullable: true })
  resultDate: Date;

  @Column({ type: 'text', nullable: true })
  findings: string;

  @Column({ type: 'text', nullable: true })
  conclusion: string;

  @Column({ name: 'image_url', length: 500, nullable: true })
  imageUrl: string;
}
