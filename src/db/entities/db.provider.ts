/* eslint-disable prettier/prettier */
import { User } from './user.entity';
export const databaseProviders = [
  {
    provide: 'USERS_REPOSITORY',
    useValue: User,
  },
];
