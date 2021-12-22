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
  const app = await NestFactory.create(
    AppModule,
    !process.env.NODE_ENV && { httpsOptions },
  );
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
