import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LogService } from "./services/log/log.service";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { DatabaseModule } from "./db/database.module";
import { AuthMiddlewareModule } from "./services/middleware/auth.middleware.module";
import { PythonLabModule } from "./graders/python-lab/python-lab.module";
import { SubjectsModule } from "./graders/subjects/subjects.module";
import { JwtDecodeModule } from "./services/jwt-decode/jwtDecode.module";
import { ClassroomModule } from './graders/classroom/classroom.module';
import { SectionModule } from './graders/section/section.module';
import { AdministratorModule } from './administrator/administrator.module';
import { SocketGateway } from "./socket/socket.gateway";
import { SocketModule } from './socket/socket.module';
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [
    UsersModule,
    AuthModule,
    AuthMiddlewareModule,
    JwtDecodeModule,
    DatabaseModule,
    PythonLabModule,
    SubjectsModule,
    ClassroomModule,
    SectionModule,
    AdministratorModule,
    SocketModule,
  ],
  controllers: [AppController],
  providers: [AppService, LogService, SocketGateway, JwtService],
})
export class AppModule {}
