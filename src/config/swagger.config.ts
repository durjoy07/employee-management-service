import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('QuestionPro Task')
  .setDescription('This APIs build for question pro task')
  .setVersion('1.0')
  .build();
