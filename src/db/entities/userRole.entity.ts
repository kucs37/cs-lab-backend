import {
  Table,
  Column,
  Model,
  DataType,
  BeforeCreate,
  BeforeUpdate,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import { Role } from "./role.entity";
import { User } from "./user.entity";
@Table
export class UserRole extends Model {

  @ForeignKey(() => User)
  @BelongsTo(() => User, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
    hooks: true,
    as: "userId",
  })
  fkStudentCode: User;

  @ForeignKey(() => Role)
  @BelongsTo(() => Role, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
    hooks: true,
    as: "roleId",
  })
  fkRoleId: Role;
}
