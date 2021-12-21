import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync(__dirname + '/masterbag.com.co.key'),
    cert: fs.readFileSync(__dirname + '/masterbag.com.co.crt'),
  };
  const app = await NestFactory.create(AppModule, { httpsOptions });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
