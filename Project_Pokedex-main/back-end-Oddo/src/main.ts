import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import fb from './firebase/firebase.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ['log', 'error'] });
  app.enableCors({
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
});
  fb.setupFirebase();
  await app.listen(3000);
}
bootstrap();
