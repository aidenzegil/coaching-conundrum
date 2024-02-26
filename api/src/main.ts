import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
  });

  /** Validation Middleware */
  app.useGlobalPipes(new ValidationPipe());
  /** Open API documentation */
  const config = new DocumentBuilder()
    .setTitle("Coaching API")
    .setDescription("The main API for Coaching")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  /** End Open API documentation  */

  await app.listen(3001);
}

void bootstrap();
