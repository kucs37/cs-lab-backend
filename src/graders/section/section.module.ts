import { forwardRef, Module } from "@nestjs/common";
import { SectionService } from "./section.service";
import { SectionController } from "./section.controller";
import { AuthModule } from "../../auth/auth.module";
import { JwtDecodeModule } from "../../services/jwt-decode/jwtDecode.module";
import { AuthMiddlewareModule } from "../../services/middleware/auth.middleware.module";
import { SubjectsModule } from "../subjects/subjects.module";
import { databaseProviders } from "../../db/entities/db.provider";

@Module({
  imports: [
    forwardRef(() => AuthMiddlewareModule),
    forwardRef(() => AuthModule),
    forwardRef(() => JwtDecodeModule),
    forwardRef(() => SubjectsModule),
  ],
  controllers: [SectionController],
  providers: [SectionService, ...databaseProviders],
})
export class SectionModule {}
