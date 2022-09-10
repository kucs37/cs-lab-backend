import {
  Table,
  Column,
  Model,
  DataType,
  BeforeCreate,
  BeforeUpdate,
} from "sequelize-typescript";
@Table
export class Lab extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    primaryKey: true,
  })
  studentCode: string;

  @Column({
    allowNull: false,
  })
  firstName: string;

  @Column({
    allowNull: false,
  })
  lastName: string;

  @Column({
    unique: true,
    allowNull: false,
  })
  email: string;
}
