import {
  Table,
  Column,
  Model,
  DataType,
  BeforeCreate,
  BeforeUpdate,
} from "sequelize-typescript";
@Table
export class Subject extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    primaryKey: true,
  })
  subjectId: string;

  @Column({
    allowNull: false,
  })
  name: string;
}
