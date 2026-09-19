import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Consultation } from './consultation.entity';
import { Disease } from './disease.entity';
import { Treatment } from './treatment.entity';

@Entity('diagnoses')
export class Diagnosis {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Consultation, (c) => c.diagnoses, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'consultation_id' })
  consultation: Consultation;

  @Column()
  consultation_id: number;

  @ManyToOne(() => Disease, { nullable: true })
  @JoinColumn({ name: 'disease_id' })
  disease: Disease;

  @Column({ nullable: true })
  disease_id: number;

  @Column('text')
  description: string;

  @OneToMany(() => Treatment, (t) => t.diagnosis, { cascade: true })
  treatments: Treatment[];
}