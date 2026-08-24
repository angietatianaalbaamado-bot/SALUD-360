import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('blood_types')
export class BloodType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
