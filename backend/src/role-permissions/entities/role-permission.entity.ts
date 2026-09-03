import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Role } from '../../roles/entities/role.entity';
import { Permission } from '../../permissions/entities/permission.entity';

@Entity('role_permissions')
export class RolePermission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'role_id' })
  roleId: number;

  @Column({ name: 'permission_id' })
  permissionId: number;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @ManyToOne(() => Permission)
  @JoinColumn({ name: 'permission_id' })
  permission: Permission;
}

