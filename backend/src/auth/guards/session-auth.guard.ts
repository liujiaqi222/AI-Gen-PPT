import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { Session } from '@fastify/secure-session';
import { RedisClient } from 'src/db/redis.provider';
import { SESSION_CONSTANTS } from 'src/constants/session.constants';

interface SessionData {
  email: string;
  sessionId: string;
}

interface RedisSessionData {
  email: string;
  lastAccess: string;
}

@Injectable()
export class SessionAuthGuard implements CanActivate {
  @Inject('REDIS_CLIENT')
  private redisClient: RedisClient;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<
        FastifyRequest & { session: Session<SessionData>; user?: SessionData }
      >();

    const sessionId = request.session.get('sessionId') as string | undefined;
    if (!sessionId) {
      throw new UnauthorizedException('No session found');
    }

    // 检查 Redis 中的会话是否存在
    const sessionData = await this.redisClient.get(
      `${SESSION_CONSTANTS.REDIS_PREFIX}${sessionId}`,
    );
    if (!sessionData) {
      // 会话不存在或已过期
      request.session.delete();
      throw new UnauthorizedException('Session expired');
    }

    // 更新最后访问时间
    const session = JSON.parse(sessionData) as RedisSessionData;
    session.lastAccess = new Date().toISOString();
    await this.redisClient.set(
      `${SESSION_CONSTANTS.REDIS_PREFIX}${sessionId}`,
      JSON.stringify(session),
      'EX',
      SESSION_CONSTANTS.EXPIRE_TIME,
    );

    // 将用户信息附加到请求对象
    request.user = {
      email: session.email,
      sessionId,
    };

    return true;
  }
}
