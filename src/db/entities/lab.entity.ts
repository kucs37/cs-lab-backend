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
import { Section } from "./section.entity";
import { Subject } from "./subject.entity";
@Table
export class Lab extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    primaryKey: true,
  })
  labId: string;

  @Column({
    allowNull: false,
  })
  name: string;

  @ForeignKey(() => Subject)
  @BelongsTo(() => Subject, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
    hooks: true,
    as: "subjectId",
  })
  fkSubjectId: Subject;

  // @ForeignKey(() => Section)
  // @BelongsTo(() => Section, {
  //   onUpdate: "CASCADE",
  //   onDelete: "CASCADE",
  //   hooks: true,
  //   as: "sectionId",
  // })
  // fkSectionId: Section;
}
