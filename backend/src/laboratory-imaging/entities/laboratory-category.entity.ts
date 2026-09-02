import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { LaboratoryTest } from './laboratory-test.entity';

@Entity('laboratory_categories')
export class LaboratoryCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 150 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ default: true })
  active: boolean;

  @OneToMany(() => LaboratoryTest, (test) => test.category)
  tests: LaboratoryTest[];
}
