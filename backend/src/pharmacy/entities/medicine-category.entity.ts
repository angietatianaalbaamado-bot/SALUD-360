import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('medicine_categories')
export class MedicineCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;
}