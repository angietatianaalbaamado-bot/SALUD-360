import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('marital_status')
export class MaritalStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
