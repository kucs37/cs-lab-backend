/* eslint-disable prettier/prettier */
import { ClassRoom } from "./classroom.entity";
import { Section } from "./section.entity";
import { Subject } from "./subject.entity";
import { User } from "./user.entity";
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
];
