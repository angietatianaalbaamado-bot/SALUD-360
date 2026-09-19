import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { NotificationTemplate } from './notification-template.entity';
import { Appointment } from './appointment.entity';

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @ManyToOne(() => NotificationTemplate)
  @JoinColumn({ name: 'notification_template_id' })
  template: NotificationTemplate;

  @Column()
  notification_template_id: number;

  @ManyToOne(() => Appointment, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'appointment_id' })
  appointment: Appointment;

  @Column({ nullable: true })
  appointment_id: number;

  @Column({ nullable: true })
  sent_at: Date;

  @Column({ default: false })
  is_read: boolean;

  @CreateDateColumn()
  created_at: Date;
}