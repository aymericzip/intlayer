import type { ConnectionOptions } from 'node:tls';
import type { Locale } from '@intlayer/types/allLocales';
import type { ContentNode } from '@intlayer/types/dictionary';
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

export const translationPauseKey = (jobId: string) =>
  `translate:pause:${jobId}`;
export const translationCancelKey = (jobId: string) =>
  `translate:cancel:${jobId}`;

export const isTranslationJobPaused = async (
  jobId: string
): Promise<boolean> => {
  const redis = getRedisClient();
  return !!(await redis.get(translationPauseKey(jobId)));
};

export const isTranslationJobCancelled = async (
  jobId: string
): Promise<boolean> => {
  const redis = getRedisClient();
  return !!(await redis.get(translationCancelKey(jobId)));
};

/** A dictionary to translate, optionally with a partial of freshly-edited source nodes. */
export type DictionaryTranslationTarget = {
  dictionaryId: string;
  locales: Locale[];
  /**
   * Partial dictionary content holding only the nodes whose source-locale value
   * was just edited (reduced to the source locale). When present, the worker
   * re-translates these nodes across all target locales and merges them back,
   * overwriting now-stale translations — on top of the normal missing-locale fill.
   */
  editedContent?: ContentNode;
};

export const addTranslationJob = async (data: {
  dictionaryTargets: DictionaryTranslationTarget[];
  projectId: string;
  userId: string;
  mode?: 'complete' | 'review';
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
