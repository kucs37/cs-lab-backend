import {
  Module,
  forwardRef,
  MiddlewareConsumer,
  RequestMethod,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { UsersModule } from "../users/users.module";
import { databaseProviders } from "../db/entities/db.provider";
import { config } from "dotenv";
import { JwtDecodeService } from "../services/jwt-decode/jwtDecode.service";
config();
@Module({
  imports: [
    //import { JwtDecodeService } from './../services/jwt-decode/jwtDecode.service';
    PassportModule.register({ defaultStrategy: "bearer", session: false }),
    PassportModule.register({ defaultStrategy: "jwt", session: false }),
    JwtModule.register({
      secretOrPrivateKey: process.env.JWT_SECRET,
      // signOptions: {
      //     expiresIn: '1y',
      // },
    }),
    forwardRef(() => UsersModule),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    ...databaseProviders,
    JwtDecodeService,
  ], // GoogleStrategy
  exports: [AuthService],
})
export class AuthModule {
  // basePath = "auth";
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(AuthMiddleware)
  //     .forRoutes({ path: `${this.basePath}/studentLogin`, method: RequestMethod.ALL });
  // }
}
