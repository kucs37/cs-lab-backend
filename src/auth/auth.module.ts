import {
  Module,
  forwardRef,
  MiddlewareConsumer,
  RequestMethod,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { HttpModule } from "@nestjs/axios";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { UsersModule } from "../users/users.module";
import { databaseProviders } from "../db/entities/db.provider";
import { GoogleStrategy } from "./strategies/google.strategy";
import { AuthMiddleware } from "../services/middleware/auth.middleware";

@Module({
  imports: [
    // PassportModule.register({ defaultStrategy: "bearer", session: false }),
    JwtModule.register({
      secretOrPrivateKey: "smalldickbigheart",
      // signOptions: {
      //     expiresIn: '1y',
      // },
    }),
    forwardRef(() => UsersModule),
    HttpModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, GoogleStrategy, ...databaseProviders],
  exports: [AuthService],
})
export class AuthModule {
  basePath = "auth";
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: `${this.basePath}/studentLogin`, method: RequestMethod.ALL });
  }
}
