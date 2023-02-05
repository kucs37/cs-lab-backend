import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { LogService } from "./services/log/log.service";
import * as mongoose from "mongoose";

async function bootstrap() {
  const logService = new LogService("main");

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // // ────────────────────────────────────────────────────────────────────────────────
  // tslint:disable-next-line:variable-name

  // ────────────────────────────────────────────────────────────────────────────────
  const config = new DocumentBuilder()
    .setTitle("CS Lab Backend")
    .setDescription("")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  logService.debug("start ... 3000");
  await app.listen(3000);
}
bootstrap();
