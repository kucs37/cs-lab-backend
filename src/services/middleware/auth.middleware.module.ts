import { HttpModule } from "@nestjs/axios";
import {
  CacheModule,
  Module,
  forwardRef,
  MiddlewareConsumer,
  RequestMethod,
} from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "../../auth/strategies/jwt.strategy";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { config } from "dotenv";
import { AuthMiddleware } from "./auth.middleware";
import { UsersModule } from "./../../users/users.module";
import { AuthService } from "./../../auth/auth.service";
import { AuthModule } from "../../auth/auth.module";
import { ClassroomModule } from './../../graders/classroom/classroom.module';
import { JwtDecodeModule } from "../jwt-decode/jwtDecode.module";
import { JwtDecodeService } from "../jwt-decode/jwtDecode.service";
config();
@Module({
  imports: [
CacheModule.register(),
    HttpModule,
    PassportModule.register({ defaultStrategy: "jwt", session: false }),
    JwtModule.register({
      secretOrPrivateKey: process.env.JWT_SECRET,
    }),
    forwardRef(() => UsersModule),
    forwardRef(() => AuthModule),
    forwardRef(() => ClassroomModule),
    forwardRef(() => JwtDecodeModule),
  ],
  providers: [AuthMiddleware, AuthService, JwtStrategy, JwtDecodeService],
  exports: [AuthMiddleware],
})
export class AuthMiddlewareModule {}
