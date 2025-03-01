export const SESSION_CONSTANTS = {
  /** 7 days in seconds */
  EXPIRE_TIME: 7 * 24 * 60 * 60,
  /** Redis key prefix for session data */
  REDIS_PREFIX: 'session:',
} as const;
