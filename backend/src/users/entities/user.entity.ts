import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { UserRole } from '../../user-roles/entities/user-role.entity';
import { Session } from '../../sessions/entities/session.entity';
import { AuditLog } from '../../audit-logs/entities/audit-log.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'password_hash' })
  passwordHash: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @OneToMany(() => UserRole, (ur) => ur.user)
  userRoles: UserRole[];

  @OneToMany(() => Session, (s) => s.user)
  sessions: Session[];

  @OneToMany(() => AuditLog, (a) => a.user)
  auditLogs: AuditLog[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
