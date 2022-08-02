import { HttpModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogService } from './services/log/log.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, HttpModule],
  controllers: [AppController],
  providers: [AppService, LogService],
})
export class AppModule {}
