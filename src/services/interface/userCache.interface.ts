import { RoleCache } from "./roleCache.interface";

export interface UserCache {
  inClass: boolean;
  studentId: string;
  firstName: string;
  lastName: string;
  role: string[];
  // email: string;
}
