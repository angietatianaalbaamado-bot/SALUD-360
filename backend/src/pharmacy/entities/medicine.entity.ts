import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { MedicineCategory } from './medicine-category.entity';
import { PharmaceuticalLaboratory } from './pharmaceutical-laboratory.entity';
import { MedicinePresentation } from './medicine-presentation.entity';
import { MedicineBatch } from './medicine-batch.entity';

@Entity('medicines')
export class Medicine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => MedicineCategory, { nullable: true })
  @JoinColumn({ name: 'medicine_category_id' })
  category: MedicineCategory;

  @Column({ nullable: true })
  medicine_category_id: number;

  @ManyToOne(() => PharmaceuticalLaboratory, { nullable: true })
  @JoinColumn({ name: 'laboratory_id' })
  laboratory: PharmaceuticalLaboratory;

  @Column({ nullable: true })
  laboratory_id: number;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => MedicinePresentation, (p) => p.medicine, { cascade: true })
  presentations: MedicinePresentation[];

  @OneToMany(() => MedicineBatch, (b) => b.medicine)
  batches: MedicineBatch[];
}