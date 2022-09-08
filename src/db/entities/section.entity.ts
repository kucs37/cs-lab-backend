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
    type: DataType.STRING,
    allowNull: false,
    // primaryKey: true,
  })
  sectionId: string;

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
}
