import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { HttpModule } from "@nestjs/axios";
import {
  CacheModule,
  Module,
  forwardRef,
  MiddlewareConsumer,
  RequestMethod,
} from "@nestjs/common";
import { UserAuthService } from "./user-auth.service";
import { PassportModule } from "@nestjs/passport";
import { AuthModule } from "../auth/auth.module";
import { databaseProviders } from "../db/entities/db.provider";
import { AuthMiddleware } from "../services/middleware/auth.middleware";
import { JwtStrategy } from "../auth/strategies/jwt.strategy";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { config } from "dotenv";
import { AuthMiddlewareModule } from "../services/middleware/auth.middleware.module";
config();
@Module({
  imports: [
    CacheModule.register(),
    HttpModule,
    PassportModule.register({ defaultStrategy: "jwt", session: false }),
    JwtModule.register({
      secretOrPrivateKey: process.env.JWT_SECRET,
    }),
    forwardRef(() => AuthModule),
    forwardRef(() => AuthMiddlewareModule),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UserAuthService,
    ...databaseProviders,
    JwtStrategy,
  ],
  exports: [UsersService, UserAuthService],
})
export class UsersModule {
  basePath = "users";
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({
        path: `${this.basePath}/checkClass`,
        method: RequestMethod.ALL,
      });
  }
}
