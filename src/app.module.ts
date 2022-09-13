import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LogService } from "./services/log/log.service";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { DatabaseModule } from "./db/database.module";
import { AuthMiddlewareModule } from "./services/middleware/auth.middleware.module";
import { PythonLabModule } from "./graders/python-lab/python-lab.module";
import { JwtDecodeModule } from "./services/jwt-decode/jwtDecode.module";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { LabModule } from './graphql/graders/lab/lab.module';
import { ClassroomModule } from './graphql/graders/classroom/classroom.module';
import loggerMiddleware from "./graphql/middleware/graphql.middleware";

@Module({
    imports: [
        UsersModule,
        AuthModule,
        AuthMiddlewareModule,
        JwtDecodeModule,
        DatabaseModule,
        PythonLabModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: true,
            debug: false,
            // buildSchemaOptions: {
            //     fieldMiddleware: [loggerMiddleware],
            //   },
            playground: true,
        }),
        LabModule,
        ClassroomModule,
    ],
    controllers: [AppController],
    providers: [AppService, LogService],
})
export class AppModule {}
