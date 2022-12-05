/* eslint-disable prettier/prettier */
import { ClassRoom } from "./classroom.entity";
import { Section } from "./section.entity";
import { Subject } from "./subject.entity";
import { User } from "./user.entity";
import { Lab } from './lab.entity';
import { LabStatus } from "./labStatus.entity";
import { Role } from './role.entity';
import { Permission } from "./permission.entity";
import { RolePermission } from "./rolePermission.entity";
import { UserRole } from "./userRole.entity";
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
  {
    provide: "ROLES_REPOSITORY",
    useValue: Role,
  },
  {
    provide: "PERMISSIONS_REPOSITORY",
    useValue: Permission,
  },
  {
    provide: "ROLE_PERMISSIONS_REPOSITORY",
    useValue: RolePermission,
  },
  {
    provide: "USER_ROLES_REPOSITORY",
    useValue: UserRole,
  },
];
