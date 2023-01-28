import { Sequelize } from 'sequelize-typescript';
import { User } from './entities/user.entity';
import { Subject } from './entities/subject.entity';
import { Section } from './entities/section.entity';
import { ClassRoom } from './entities/classroom.entity';
import { Lab } from './entities/lab.entity';
import { LabStatus } from './entities/labStatus.entity';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { RolePermission } from './entities/rolePermission.entity';
import { UserRole } from './entities/userRole.entity';

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
      sequelize.addModels([Lab]);
      sequelize.addModels([LabStatus]);
      sequelize.addModels([Role]);
      sequelize.addModels([Permission]);
      sequelize.addModels([RolePermission]);
      sequelize.addModels([UserRole]);
      UserRole.removeAttribute('id');
      await sequelize.sync({ alter: true, force: true });
      return sequelize;
    },
  },
  
];
