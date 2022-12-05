import { Module } from '@nestjs/common';
import { AdministratorService } from './administrator.service';
import { AdministratorController } from './administrator.controller';

@Module({
  controllers: [AdministratorController],
  providers: [AdministratorService]
})
export class AdministratorModule {}
