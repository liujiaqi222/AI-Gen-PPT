import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Inject,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { Session } from '@fastify/secure-session';
import * as crypto from 'node:crypto';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { SESSION_CONSTANTS } from '../constants/session.constants';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { RedisClient } from '../db/redis.provider';
import { SessionData } from './type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Inject('REDIS_CLIENT')
  private redisClient: RedisClient;
  @Post('sign-up')
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async login(
    @Request()
    req: FastifyRequest & {
      user: SessionData; // 返回值见 this.authService.validateLocalUser(email,password)
      session: Session<SessionData<{sessionId:string}>>;
    },
  ) {
    console.log(req);
    const sessionId = crypto.randomUUID();
    req.session.set('email', req.user.email);
    req.session.set('name', req.user.name);
    req.session.set('sessionId', sessionId);

    await this.redisClient.set(
      `${SESSION_CONSTANTS.REDIS_PREFIX}${sessionId}`,
      JSON.stringify({
        email: req.user.email,
        lastAccess: new Date().toISOString(),
      }),
      'EX',
      24 * 60 * 60 * 7,
    );
    return {
      message: 'Login successful',
      data: { sessionId, email: req.user.email },
    };
  }

  @Post('sign-out')
  async signOut(
    @Request()
    req: FastifyRequest & {
      session: Session<SessionData<{sessionId:string}>>;
    },
  ) {
    const sessionId = req.session.get('sessionId') as string | undefined;
    if (sessionId) {
      await this.redisClient.del(`session:${sessionId}`);
      req.session.delete();
    }
    return { message: 'Logged out successfully' };
  }
}
