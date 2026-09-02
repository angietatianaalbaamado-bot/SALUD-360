import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LaboratoryCategory } from './laboratory-category.entity';
import { LaboratoryResult } from './laboratory-result.entity';

@Entity('laboratory_tests')
export class LaboratoryTest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 150 })
  name: string;

  @Column({ length: 30, unique: true })
  code: string;

  @Column({ name: 'sample_type', length: 100, nullable: true })
  sampleType: string;

  @Column({ name: 'reference_range', type: 'text', nullable: true })
  referenceRange: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;

  @Column({ name: 'category_id' })
  categoryId: string;

  @ManyToOne(() => LaboratoryCategory, (category) => category.tests)
  @JoinColumn({ name: 'category_id' })
  category: LaboratoryCategory;

  @OneToMany(() => LaboratoryResult, (result) => result.test)
  results: LaboratoryResult[];
}
