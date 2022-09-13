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
import { User } from "./user.entity";
import { Subject } from "./subject.entity";
import { Section } from "./section.entity";
@Table
export class ClassRoom extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    primaryKey: true,
  })
  classroomId: string;

  @ForeignKey(() => User)
  @BelongsTo(() => User, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
    hooks: true,
    as: "studentCode",
  })
  fkStudentCode: User;

  @ForeignKey(() => Subject)
  @BelongsTo(() => Subject, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
    hooks: true,
    as: "subjectId",
  })
  fkSubjectId: Subject;

  @ForeignKey(() => Section)
  @BelongsTo(() => Section, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
    hooks: true,
    as: "sectionId",
  })
  fkSectionId: Section;
}
