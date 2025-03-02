import { Session } from '@fastify/secure-session';
import type { FastifyRequest } from 'fastify';

// 值源于 this.authService.validateLocalUser(email,password)
export type SessionData<T = unknown> = T & {
  name: string;
  email: string;
};

export type AuthRequest = FastifyRequest & {
  user: SessionData;
  session: Session<SessionData<{ sessionId: string }>>;
};
