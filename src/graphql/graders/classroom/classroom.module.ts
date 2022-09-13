import { Module } from "@nestjs/common";
import { ClassroomService } from "./classroom.service";
import { ClassroomResolver } from "./classroom.resolver";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { JwtStrategy } from "../../../auth/strategies/jwt.strategy";

@Module({
    providers: [ClassroomResolver, ClassroomService],
})
export class ClassroomModule {}
