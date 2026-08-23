import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { ReportExport } from './report-export.entity';

@Entity('reports')
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // Relación lógica con users (módulo de Seguridad y Accesos)
  @Column()
  created_by: number;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => ReportExport, (exp) => exp.report)
  exports: ReportExport[];
}
