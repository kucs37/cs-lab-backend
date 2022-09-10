/* eslint-disable prettier/prettier */
import { ClassRoom } from "./classroom.entity";
import { Section } from "./section.entity";
import { Subject } from "./subject.entity";
import { User } from "./user.entity";
import { Lab } from './lab.entity';
import { LabStatus } from "./labStatus.entity";
export const databaseProviders = [
  {
    provide: "USERS_REPOSITORY",
    useValue: User,
  },
  {
    provide: "SUBJECTS_REPOSITORY",
    useValue: Subject,
  },
  {
    provide: "SECTIONS_REPOSITORY",
    useValue: Section,
  },
  {
    provide: "CLASSROOMS_REPOSITORY",
    useValue: ClassRoom,
  },
  {
    provide: "LABS_REPOSITORY",
    useValue: Lab,
  },
  {
    provide: "LAB_STATUSES_REPOSITORY",
    useValue: LabStatus,
  },
];
