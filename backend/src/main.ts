import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import secureSession from '@fastify/secure-session';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { SESSION_CONSTANTS } from './constants/session.constants';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  const configService = app.get(ConfigService);
  const port: number = configService.get<number>('PORT') || 5000;
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  console.log(fs.readFileSync);
  await app.register(secureSession, {
    key: fs.readFileSync(path.join(__dirname, '..', 'secret-key')),
    cookieName: 'session',
    expiry: SESSION_CONSTANTS.EXPIRE_TIME,
    cookie: {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    },
  });
  app.enableCors({origin:'http://localhost:3000',credentials:true});

  await app.listen(port);
}
bootstrap().catch((err) => {
  console.error('Error during bootstrap:', err);
});
