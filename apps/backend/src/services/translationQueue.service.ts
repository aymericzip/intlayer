import type { ConnectionOptions } from 'node:tls';
import { logger } from '@logger';
import { getRedisClient } from '@utils/redis/connectRedis';
import { Queue, QueueEvents } from 'bullmq';

export const translationQueueName = `translation-queue-${process.env.NODE_ENV}`;

let translationQueueInstance: Queue | null = null;
let translationQueueEventsInstance: QueueEvents | null = null;

export const getTranslationQueue = () => {
  if (translationQueueInstance) {
    return translationQueueInstance;
  }

  const connection = getRedisClient();

  translationQueueInstance = new Queue(translationQueueName, {
    connection: connection as unknown as ConnectionOptions,
  });

  return translationQueueInstance;
};

export const getTranslationQueueEvents = () => {
  if (translationQueueEventsInstance) {
    return translationQueueEventsInstance;
  }

  const connection = getRedisClient();

  translationQueueEventsInstance = new QueueEvents(translationQueueName, {
    connection: connection as unknown as ConnectionOptions,
  });

  return translationQueueEventsInstance;
};

export const addTranslationJob = async (data: {
  dictionaryIds: string[];
  targetLocales: string[];
  projectId: string;
  userId: string;
}) => {
  try {
    const queue = getTranslationQueue();
    const job = await queue.add('translate-dictionaries', data);
    logger.info(`Translation job added: ${job.id}`);
    return job;
  } catch (error) {
    logger.error('Error adding translation job:', error);
    throw error;
  }
};
