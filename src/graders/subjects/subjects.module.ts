import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  RequestMethod,
} from "@nestjs/common";
import { SubjectsService } from "./subjects.service";
import { SubjectsController } from "./subjects.controller";
import { AuthMiddleware } from "../../services/middleware/auth.middleware";
import { AuthMiddlewareModule } from "../../services/middleware/auth.middleware.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { config } from "dotenv";
import { JwtStrategy } from "../../auth/strategies/jwt.strategy";
import { AuthModule } from "../../auth/auth.module";
import { databaseProviders } from "../../db/entities/db.provider";
import { JwtDecodeModule } from './../../services/jwt-decode/jwtDecode.module';
import { ClassroomModule } from './../classroom/classroom.module';
config();
@Module({
  imports: [
PassportModule.register({ defaultStrategy: "jwt", session: false }),
    JwtModule.register({
      secretOrPrivateKey: process.env.JWT_SECRET,
    }),
    forwardRef(() => AuthMiddlewareModule),
    forwardRef(() => AuthModule),
    forwardRef(() => ClassroomModule),
    forwardRef(() => JwtDecodeModule),
  ],
  controllers: [SubjectsController],
  providers: [SubjectsService, JwtStrategy, ...databaseProviders],
})
export class SubjectsModule {
  basePath = "subjects";
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: `${this.basePath}/findAll`,
      method: RequestMethod.ALL,
    });
  }
}
