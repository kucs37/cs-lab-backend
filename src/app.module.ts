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
import { ClassroomModule } from "./graders/classroom/classroom.module";
import { SectionModule } from "./graders/section/section.module";
import { AdministratorModule } from "./administrator/administrator.module";
import { JwtService } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    UsersModule,
    AuthModule,
    AuthMiddlewareModule,
    JwtDecodeModule,
    // DatabaseModule,
    PythonLabModule,
    SubjectsModule,
    ClassroomModule,
    SectionModule,
    AdministratorModule,
    MongooseModule.forRoot(
      "mongodb://root:123@43.229.133.161:27017/cslab?authSource=admin",
      
    ),
  ],
  controllers: [AppController],
  providers: [AppService, LogService, JwtService],
})
export class AppModule {}
