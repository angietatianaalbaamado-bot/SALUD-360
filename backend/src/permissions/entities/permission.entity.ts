import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RolePermission } from '../../role-permissions/entities/role-permission.entity';

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  module: string;

  @OneToMany(() => RolePermission, (rp) => rp.permission)
  rolePermissions: RolePermission[];
}
