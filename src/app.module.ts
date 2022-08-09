import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LogService } from "./services/log/log.service";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { DatabaseModule } from "./db/database.module";
import { GoogleStrategy } from "./auth/strategies/google.strategy";
import { PassportModule } from "@nestjs/passport";

@Module({
  imports: [
    UsersModule,
    AuthModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService, LogService],
})
export class AppModule {}
