import { forwardRef, Module } from "@nestjs/common";
import { ClassroomService } from "./classroom.service";
import { ClassroomController } from "./classroom.controller";
import { databaseProviders } from "../../db/entities/db.provider";
import { JwtDecodeModule } from "../../services/jwt-decode/jwtDecode.module";
import { SubjectsModule } from "./../subjects/subjects.module";
import { AuthMiddlewareModule } from "../../services/middleware/auth.middleware.module";
import { AuthModule } from "../../auth/auth.module";
import { SubjectsService } from './../subjects/subjects.service';

@Module({
  imports: [
  forwardRef(() => AuthMiddlewareModule),
    forwardRef(() => AuthModule),
    forwardRef(() => JwtDecodeModule),
    forwardRef(() => SubjectsModule),
  ],
  controllers: [ClassroomController],
  providers: [ClassroomService, ...databaseProviders, SubjectsService],
})
export class ClassroomModule {}
