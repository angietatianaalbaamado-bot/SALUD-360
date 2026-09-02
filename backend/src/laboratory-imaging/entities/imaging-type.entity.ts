import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ImagingOrder } from './imaging-order.entity';

@Entity('imaging_types')
export class ImagingType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 150 })
  name: string;

  @Column({ name: 'body_part', length: 100, nullable: true })
  bodyPart: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;

  @OneToMany(() => ImagingOrder, (order) => order.imagingType)
  orders: ImagingOrder[];
}
