import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Medicine } from './medicine.entity';

@Entity('medicine_presentations')
export class MedicinePresentation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Medicine, (m) => m.presentations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'medicine_id' })
  medicine: Medicine;

  @Column()
  medicine_id: number;

  @Column()
  presentation: string;

  @Column({ nullable: true })
  concentration: string;
}