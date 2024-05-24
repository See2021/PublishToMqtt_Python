import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://35.197.129.16:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
    exposedHeaders: ['Cross-Origin-Embedder-Policy', 'Cross-Origin-Opener-Policy'],
  });

  await app.listen(3010);
}
bootstrap();