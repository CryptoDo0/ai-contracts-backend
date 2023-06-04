import { NestFactory } from '@nestjs/core';
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from './pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:63342',
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:7300',
      'https://lab.cryptodo.app',
      'https://lab.staging.cryptodo.app',
      'https://ai.cryptodo.app'
    ]
  })

  const config = new DocumentBuilder()
    .setTitle("ChatGpt code generator")
    .setDescription("ChatGpt solidity code generator REST API")
    .setVersion('1.0.0')
    .addTag('BASEAPI')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/support/api/docs', app, document);

  //  app.useGlobalGuards([new JwtAuthGuard()]); // global guards
      app.useGlobalPipes(new ValidationPipe()); // global pipes

  const PORT = process.env.PORT || 3001;
  await app.listen(PORT, () => console.log(`Server start on port = ${PORT}`));
}
bootstrap();
