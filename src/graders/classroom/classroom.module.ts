import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  RequestMethod,
} from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthModule } from "../../auth/auth.module";
import { databaseProviders } from "../../db/entities/db.provider";
import { JwtDecodeModule } from "../../services/jwt-decode/jwtDecode.module";
import { JwtDecodeService } from "../../services/jwt-decode/jwtDecode.service";
import { AuthMiddleware } from "../../services/middleware/auth.middleware";
import { AuthMiddlewareModule } from "../../services/middleware/auth.middleware.module";
import { SectionModule } from "../section/section.module";
import { SectionService } from "../section/section.service";
import { SubjectsModule } from "./../subjects/subjects.module";
import { SubjectsService } from "./../subjects/subjects.service";
import { ClassroomController } from "./classroom.controller";
import { ClassroomService } from "./classroom.service";
import { config } from "dotenv";
config();
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt", session: false }),
    JwtModule.register({
      secretOrPrivateKey: process.env.JWT_SECRET,
    }),
    forwardRef(() => AuthMiddlewareModule),
    forwardRef(() => AuthModule),
    forwardRef(() => JwtDecodeModule),
    forwardRef(() => SubjectsModule),
    forwardRef(() => SectionModule),
  ],
  controllers: [ClassroomController],
  providers: [
    ClassroomService,
    ...databaseProviders,
    SubjectsService,
    SectionService,
    JwtDecodeService,
  ],
})
export class ClassroomModule {
  basePath = "classrooms";
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: `${this.basePath}/studentClass`,
      method: RequestMethod.ALL,
    });
  }
}
