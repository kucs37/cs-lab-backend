import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
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
import { JwtDecodeModule } from "../services/jwt-decode/jwtDecode.module";
import { MongooseModule } from "@nestjs/mongoose";
import { EntityEnumMongo } from "../database/entity";
import { ProductSchema } from "../database/schema/product.schema";
import { UserSchema } from "../database/schema/user.schema";
config();
@Module({
  imports: [
    CacheModule.register(),
    MongooseModule.forFeature([
      { name: EntityEnumMongo.userDB, schema: UserSchema },
      // { name: EntityEnumMongo.roleDB, schema: UserSchema },
    ]),
    PassportModule.register({ defaultStrategy: "jwt", session: false }),
    JwtModule.register({
      secretOrPrivateKey: process.env.JWT_SECRET,
    }),
    forwardRef(() => AuthModule),
    forwardRef(() => AuthMiddlewareModule),
    forwardRef(() => JwtDecodeModule),

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
