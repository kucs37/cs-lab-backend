import {
  Table,
  Column,
  Model,
  DataType,
  BeforeCreate,
  BeforeUpdate,
} from "sequelize-typescript";
@Table
export class Role extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    primaryKey: true,
  })
  role: string;

  @Column({
    allowNull: false,
  })
  displayName: string;

  @Column({
    allowNull: false,
  })
  roleLevel: number;
}
