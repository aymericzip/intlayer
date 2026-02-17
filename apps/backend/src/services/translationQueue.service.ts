import { logger } from '@logger';
import { Queue, QueueEvents } from 'bullmq';
import Redis from 'ioredis';

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
  logger.error('REDIS_URL is not defined');
}

const connection = new Redis(redisUrl!, {
  maxRetriesPerRequest: null,
});

export const translationQueueName = `translation-queue-${process.env.NODE_ENV}`;

export const translationQueue = new Queue(translationQueueName, {
  connection,
});

export const translationQueueEvents = new QueueEvents(translationQueueName, {
  connection,
});

export const addTranslationJob = async (data: {
  dictionaryIds: string[];
  targetLocales: string[];
  projectId: string;
  userId: string;
}) => {
  try {
    const job = await translationQueue.add('translate-dictionaries', data);
    logger.info(`Translation job added: ${job.id}`);
    return job;
  } catch (error) {
    logger.error('Error adding translation job:', error);
    throw error;
  }
};
