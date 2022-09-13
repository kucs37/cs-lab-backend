import { Sequelize } from 'sequelize-typescript';
import { User } from './entities/user.entity';
import { Subject } from './entities/subject.entity';
import { Section } from './entities/section.entity';
import { ClassRoom } from './entities/classroom.entity';
import { Lab } from './entities/lab.entity';
import { LabStatus } from './entities/labStatus.entity';

import { config } from "dotenv";
config();

export const Database = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: process.env.DB_HOST,
        port: 3306,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
      });
      sequelize.addModels([User]);
      sequelize.addModels([Subject]);
      sequelize.addModels([Section]);
      sequelize.addModels([ClassRoom]);
      sequelize.addModels([Lab]);
      sequelize.addModels([LabStatus]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
