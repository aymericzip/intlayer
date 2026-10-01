import { logger } from '@logger';
import Redis from 'ioredis';

let redisClientInstance: Redis | null = null;

/**
 * Whether Redis is configured (`REDIS_URL` set). Without it the backend runs
 * normally, but live translations (BullMQ queue + worker) are disabled.
 */
export const isRedisEnabled = (): boolean => Boolean(process.env.REDIS_URL);

/**
 * Connect to Redis. Resolves `null` when `REDIS_URL` is not set.
 */
export const connectRedis = async (): Promise<Redis | null> => {
  try {
    if (redisClientInstance) {
      return redisClientInstance;
    }

    const redisUrl = process.env.REDIS_URL;

    if (!redisUrl) {
      logger.warn('REDIS_URL is not defined - live translations are disabled');
      return null;
    }

    const client = new Redis(redisUrl, {
      maxRetriesPerRequest: null,
      lazyConnect: true, // We want to await connection
    });

    client.on('error', (err) => {
      logger.error('Redis connection error:', err);
    });

    await client.connect();

    logger.info('Redis connected');

    redisClientInstance = client;

    return redisClientInstance;
  } catch (error) {
    const errorMessage = `Redis connection error - ${(error as Error).message}`;

    logger.error(errorMessage);
    throw new Error(errorMessage);
  }
};

/**
 * Get the Redis client instance.
 * Must be called after connectRedis() has been executed.
 */
export const getRedisClient = (): Redis => {
  if (!redisClientInstance) {
    throw new Error('Redis not connected. Call connectRedis() first.');
  }
  return redisClientInstance;
};
