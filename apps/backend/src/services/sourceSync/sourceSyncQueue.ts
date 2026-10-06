import type { ConnectionOptions } from 'node:tls';
import { logger } from '@logger';
import { getRedisClient, isRedisEnabled } from '@utils/redis/connectRedis';
import { DelayedError, type Job, Queue, Worker } from 'bullmq';
import type { Dictionary } from '@/types/dictionary.types';
import type { Project } from '@/types/project.types';
import {
  isDictionarySourceSynced,
  syncDictionariesToSource,
} from './syncDictionariesToSource';

/** Edits are committed once the CMS has been quiet for that long */
export const SOURCE_SYNC_DEBOUNCE_MS = 60_000;

/** …or at most that long after the first pending edit */
export const SOURCE_SYNC_MAX_WAIT_MS = 5 * 60_000;

const sourceSyncQueueName = `source-sync-queue-${process.env.NODE_ENV}`;

export type ScheduleSourceSyncOptions = {
  projectId: string;
  dictionaryId: string;
  /** Editor of the change, whose git login is the token fallback */
  userId?: string;
};

type SourceSyncJobData = { projectId: string };

type PendingWindow = {
  firstChangeAt: number;
  lastChangeAt: number;
};

/**
 * Time at which the pending edits should be committed, or `undefined` when
 * the window is already over.
 */
export const getFlushTime = (
  { firstChangeAt, lastChangeAt }: PendingWindow,
  now: number
): number | undefined => {
  const flushTime = Math.min(
    lastChangeAt + SOURCE_SYNC_DEBOUNCE_MS,
    firstChangeAt + SOURCE_SYNC_MAX_WAIT_MS
  );

  return flushTime > now ? flushTime : undefined;
};

// In-memory scheduler (no Redis: single instance)

type MemoryPendingSync = PendingWindow & {
  dictionaryIds: Set<string>;
  userId?: string;
  timer?: ReturnType<typeof setTimeout>;
};

const memoryPendingSyncs = new Map<string, MemoryPendingSync>();

const flushMemoryPendingSync = async (projectId: string): Promise<void> => {
  const pendingSync = memoryPendingSyncs.get(projectId);

  if (!pendingSync) return;

  const flushTime = getFlushTime(pendingSync, Date.now());

  if (flushTime !== undefined) {
    armMemoryTimer(projectId, pendingSync, flushTime);
    return;
  }

  memoryPendingSyncs.delete(projectId);

  await syncDictionariesToSource({
    projectId,
    dictionaryIds: [...pendingSync.dictionaryIds],
    userId: pendingSync.userId,
  }).catch((error) =>
    logger.error(`Source sync failed for project ${projectId}`, error)
  );
};

const armMemoryTimer = (
  projectId: string,
  pendingSync: MemoryPendingSync,
  flushTime: number
): void => {
  clearTimeout(pendingSync.timer);
  pendingSync.timer = setTimeout(
    () => void flushMemoryPendingSync(projectId),
    Math.max(flushTime - Date.now(), 0)
  );
  // Never keep the process alive for a pending commit
  pendingSync.timer.unref?.();
};

const scheduleInMemory = ({
  projectId,
  dictionaryId,
  userId,
}: ScheduleSourceSyncOptions): void => {
  const now = Date.now();
  const pendingSync = memoryPendingSyncs.get(projectId) ?? {
    dictionaryIds: new Set<string>(),
    firstChangeAt: now,
    lastChangeAt: now,
  };

  pendingSync.dictionaryIds.add(dictionaryId);
  pendingSync.lastChangeAt = now;
  pendingSync.userId = userId ?? pendingSync.userId;
  memoryPendingSyncs.set(projectId, pendingSync);

  armMemoryTimer(projectId, pendingSync, getFlushTime(pendingSync, now) ?? now);
};

// Redis scheduler (BullMQ: survives restarts, shared across instances)

const getRedisKeys = (projectId: string) => {
  const prefix = `source-sync:${projectId}`;

  return {
    dictionaryIds: `${prefix}:dictionaries`,
    firstChangeAt: `${prefix}:first-change-at`,
    lastChangeAt: `${prefix}:last-change-at`,
    userId: `${prefix}:user-id`,
  };
};

let sourceSyncQueue: Queue<SourceSyncJobData> | null = null;

const getSourceSyncQueue = (): Queue<SourceSyncJobData> => {
  sourceSyncQueue ??= new Queue<SourceSyncJobData>(sourceSyncQueueName, {
    connection: getRedisClient() as unknown as ConnectionOptions,
  });

  return sourceSyncQueue;
};

const scheduleInRedis = async ({
  projectId,
  dictionaryId,
  userId,
}: ScheduleSourceSyncOptions): Promise<void> => {
  const redis = getRedisClient();
  const keys = getRedisKeys(projectId);
  const now = Date.now();

  const transaction = redis
    .multi()
    .sadd(keys.dictionaryIds, dictionaryId)
    .set(keys.lastChangeAt, String(now))
    .set(keys.firstChangeAt, String(now), 'NX');

  if (userId) transaction.set(keys.userId, userId);

  await transaction.exec();

  const firstChangeAt = (await redis.get(keys.firstChangeAt)) ?? String(now);

  // One job per pending window: adding it again is a no-op. A change made
  // while a window is being committed opens a new window, hence a new job.
  await getSourceSyncQueue().add(
    'sync',
    { projectId },
    {
      jobId: `${projectId}-${firstChangeAt}`,
      delay: SOURCE_SYNC_DEBOUNCE_MS,
      removeOnComplete: true,
      removeOnFail: true,
    }
  );
};

const processSourceSyncJob = async (
  job: Job<SourceSyncJobData>,
  token?: string
): Promise<void> => {
  const { projectId } = job.data;
  const redis = getRedisClient();
  const keys = getRedisKeys(projectId);

  const [firstChangeAt, lastChangeAt] = await redis.mget(
    keys.firstChangeAt,
    keys.lastChangeAt
  );

  if (!firstChangeAt || !lastChangeAt) return;

  const flushTime = getFlushTime(
    {
      firstChangeAt: Number(firstChangeAt),
      lastChangeAt: Number(lastChangeAt),
    },
    Date.now()
  );

  if (flushTime !== undefined) {
    await job.moveToDelayed(flushTime, token);
    throw new DelayedError();
  }

  const results = await redis
    .multi()
    .smembers(keys.dictionaryIds)
    .get(keys.userId)
    .del(keys.dictionaryIds, keys.firstChangeAt, keys.lastChangeAt, keys.userId)
    .exec();

  const dictionaryIds = (results?.[0]?.[1] as string[] | null) ?? [];
  const userId = (results?.[1]?.[1] as string | null) ?? undefined;

  if (dictionaryIds.length === 0) return;

  await syncDictionariesToSource({ projectId, dictionaryIds, userId });
};

let sourceSyncWorker: Worker<SourceSyncJobData> | null = null;

/**
 * Starts the worker committing CMS edits to the repositories. Requires Redis;
 * without it, edits are batched in memory.
 */
export const startSourceSyncWorker = (): Worker<SourceSyncJobData> => {
  sourceSyncWorker ??= new Worker<SourceSyncJobData>(
    sourceSyncQueueName,
    processSourceSyncJob,
    {
      connection: getRedisClient() as unknown as ConnectionOptions,
      concurrency: 1,
    }
  );

  sourceSyncWorker.on('failed', (job, error) => {
    logger.error(`Source sync job ${job?.id} failed:`, error);
  });

  return sourceSyncWorker;
};

/**
 * Queues a CMS edit to be committed to the dictionary source file. Edits of a
 * project are batched into a single commit.
 */
export const scheduleSourceSync = async (
  options: ScheduleSourceSyncOptions
): Promise<void> => {
  if (isRedisEnabled() && sourceSyncWorker) {
    await scheduleInRedis(options);
    return;
  }

  scheduleInMemory(options);
};

/**
 * Queues the commit of a dictionary edit when the project commits CMS edits
 * and the dictionary is declared in the codebase. Never throws: committing is
 * a side effect of the edit.
 *
 * @returns Whether a commit was queued
 */
export const scheduleDictionarySourceSync = async ({
  project,
  dictionary,
  userId,
}: {
  project: Pick<Project, 'id' | 'repository' | 'webhooks'>;
  dictionary: Pick<Dictionary, 'id' | 'location' | 'filePath'>;
  userId?: string;
}): Promise<boolean> => {
  if (!isDictionarySourceSynced(project, dictionary)) return false;

  try {
    await scheduleSourceSync({
      projectId: String(project.id),
      dictionaryId: String(dictionary.id),
      userId,
    });
    return true;
  } catch (error) {
    logger.error('Failed to queue the dictionary source sync', error);
    return false;
  }
};
