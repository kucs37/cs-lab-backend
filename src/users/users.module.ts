import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { HttpModule } from "@nestjs/axios";
import { CacheModule, Module, forwardRef, MiddlewareConsumer, RequestMethod } from "@nestjs/common";
import { UserAuthService } from "./user-auth.service";
import { PassportModule } from "@nestjs/passport";
import { AuthModule } from "../auth/auth.module";
import { databaseProviders } from "../db/entities/db.provider";
import { GoogleStrategy } from "../auth/strategies/google.strategy";
import { GoogleAuthenticationService } from "../services/google/googleAuthentication.service";
import { AuthMiddleware } from "../services/middleware/auth.middleware";

@Module({
  imports: [
    CacheModule.register(),
    HttpModule,
    // PassportModule.register({ defaultStrategy: "google", session: false }),
    forwardRef(() => AuthModule),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UserAuthService,
    ...databaseProviders,
    GoogleStrategy,
    GoogleAuthenticationService,
  ],
  exports: [UsersService, UserAuthService],
})
export class UsersModule {
  basePath = "users";
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: `${this.basePath}/findUser`, method: RequestMethod.ALL });
  }
}
