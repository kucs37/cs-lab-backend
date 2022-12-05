import {
  Table,
  Column,
  Model,
  DataType,
  BeforeCreate,
  BeforeUpdate,
} from "sequelize-typescript";
@Table
export class Permission extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  permissionId: number;

  @Column({
    allowNull: false,
  })
  permissionDetail: string;
}
