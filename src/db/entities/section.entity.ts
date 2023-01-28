import {
  Table,
  Column,
  Model,
  DataType,
  BeforeCreate,
  BeforeUpdate,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Subject } from "./subject.entity";
@Table
export class Section extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    // primaryKey: true,
  })
  section: number;

  @ForeignKey(() => Subject)
  @BelongsTo(() => Subject, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
    hooks: true,
    as: "subjectId",
  })
  fkSubjectId: Subject;

  @Column({
    allowNull: false,
  })
  name: string;

  @Column({
    allowNull: false,
  })
  status: number;
}
