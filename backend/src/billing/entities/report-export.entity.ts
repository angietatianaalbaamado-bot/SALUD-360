import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Report } from './report.entity';

export enum ReportFormat {
  PDF = 'pdf',
  XLSX = 'xlsx',
  CSV = 'csv',
}

@Entity('report_exports')
export class ReportExport {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Report, (report) => report.exports)
  @JoinColumn({ name: 'report_id' })
  report: Report;

  @Column()
  report_id: number;

  @Column({ type: 'enum', enum: ReportFormat })
  format: ReportFormat;

  @Column()
  file_url: string;

  @CreateDateColumn()
  exported_at: Date;
}
