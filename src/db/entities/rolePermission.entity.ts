import {
  Table,
  Column,
  Model,
  DataType,
  BeforeCreate,
  BeforeUpdate,
  ForeignKey,
  HasMany,
  BelongsTo,
} from "sequelize-typescript";
import { Permission } from "./permission.entity";
import { Role } from "./role.entity";
@Table
export class RolePermission extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  rolePermissionId: number;

  @ForeignKey(() => Role)
  @BelongsTo(() => Role, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
    hooks: true,
    as: "roleId",
  })
  fkRoleId: Role;

  @ForeignKey(() => Permission)
  @BelongsTo(() => Permission, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
    hooks: true,
    as: "permissionId",
  })
  fkPermissionId: Permission;
}
