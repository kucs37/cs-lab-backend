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
import { UsersModule } from "./../../users/users.module";
import { AuthService } from "./../../auth/auth.service";
import { AuthModule } from "../../auth/auth.module";
import { JwtDecodeService } from "./jwtDecode.service";
import { SubjectsModule } from "./../../graders/subjects/subjects.module";
import { ClassroomModule } from "./../../graders/classroom/classroom.module";
import { AuthMiddlewareModule } from "./../middleware/auth.middleware.module";
import { SocketModule } from "../../socket/socket.module";
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
    forwardRef(() => SubjectsModule),
    forwardRef(() => ClassroomModule),
    forwardRef(() => AuthMiddlewareModule),
    forwardRef(() => SocketModule),

  ],
  providers: [JwtDecodeService, AuthService, JwtStrategy],
  exports: [JwtDecodeService],
})
export class JwtDecodeModule {}
