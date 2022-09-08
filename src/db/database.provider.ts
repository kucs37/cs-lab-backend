import { Sequelize } from 'sequelize-typescript';
import { User } from './entities/user.entity';
import { Subject } from './entities/subject.entity';
import { Section } from './entities/section.entity';
import { ClassRoom } from './entities/classroom.entity';

export const Database = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'cslab',
      });
      sequelize.addModels([User]);
      sequelize.addModels([Subject]);
      sequelize.addModels([Section]);
      sequelize.addModels([ClassRoom]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
