import { Provider } from '@nestjs/common';
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';

export type RedisClient = Redis;

export const RedisProvider: Provider = {
  inject: [ConfigService],
  useFactory: (configService: ConfigService): RedisClient => {
    console.log('process.env.REDIS_URL:', process.env.REDIS_URL);
    const redisUrl = configService.get<string>('REDIS_URL');
    console.log('ConfigService REDIS_URL:', redisUrl);
    if (!redisUrl) {
      throw new Error('REDIS_URL is not defined');
    }

    return new Redis(redisUrl);
  },
  provide: 'REDIS_CLIENT',
};
