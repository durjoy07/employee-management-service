import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import 'dotenv/config';
import { validationPipe } from './config/validation.config';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './config/swagger.config';
import { CustomLoggerService } from './config/logger.service';
import { HttpExceptionFilter } from './lib/http-exception.filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(validationPipe);
  const logger = app.get(CustomLoggerService);
  app.useGlobalFilters(new HttpExceptionFilter(logger));
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);
  await app.listen(process.env.PORT || 4000, () => {
    console.log(`App listening on port ${process.env.PORT || 4000}`);
  });
}
bootstrap();
