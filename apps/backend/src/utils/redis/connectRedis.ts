import { logger } from '@logger';
import Redis from 'ioredis';

let redisClientInstance: Redis | null = null;

export const connectRedis = async (): Promise<Redis> => {
  try {
    if (redisClientInstance) {
      return redisClientInstance;
    }

    const redisUrl = process.env.REDIS_URL;

    if (!redisUrl) {
      const errorMessage = 'REDIS_URL is not defined';
      logger.error(errorMessage);
      throw new Error(errorMessage);
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
