import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync(
      path.resolve(__dirname, './secrets/masterbag.com.co.key'),
    ),
    cert: fs.readFileSync(
      path.resolve(__dirname, './secrets/masterbag.com.co.crt'),
    ),
  };
  const app = process.env.NODE_ENV
    ? await NestFactory.create(AppModule)
    : await NestFactory.create(AppModule, { httpsOptions });
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
