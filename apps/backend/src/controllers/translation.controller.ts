import { getMissingLocalesContentFromDictionary } from '@intlayer/core/plugins';
import type { Locale } from '@intlayer/types/allLocales';
import { logger } from '@logger';
import * as dictionaryService from '@services/dictionary.service';
import {
  addTranslationJob,
  getTranslationQueue,
  isTranslationJobPaused,
  translationCancelKey,
  translationPauseKey,
} from '@services/translationQueue.service';
import { type AppError, ErrorHandler } from '@utils/errors';
import { getRedisClient } from '@utils/redis/connectRedis';
import { formatResponse, type ResponseData } from '@utils/responseData';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { Types } from 'mongoose';

export type TranslateDictionariesBody = {
  dictionaryIds: string[];
  targetLocales: Locale[];
};
export type TranslateDictionariesResult = ResponseData<{ jobId: string }>;

export const translateDictionaries = async (
  request: FastifyRequest<{ Body: TranslateDictionariesBody }>,
  reply: FastifyReply
): Promise<void> => {
  const { project, user } = request.session || {};
  const { dictionaryIds, targetLocales } = request.body;

  if (!project) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'PROJECT_NOT_DEFINED'
    );
  }
  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }

  try {
    const validIds = dictionaryIds.filter((id) => Types.ObjectId.isValid(id));
    const dictionaries = await dictionaryService.findDictionaries(
      { _id: { $in: validIds.map((id) => new Types.ObjectId(id)) } },
      0,
      validIds.length,
      undefined,
      false
    );

    const dictionaryTargets: { dictionaryId: string; locales: Locale[] }[] = [];

    const projectLocales =
      project.configuration?.internationalization?.locales ?? [];

    for (const dictionary of dictionaries) {
      const versionList = Array.from(dictionary.content.keys());
      const lastVersion = versionList[versionList.length - 1] || 'v1';
      const node = dictionary.content.get(lastVersion);

      if (!node) continue;

      // Use core logic to find missing locales
      const missingLocales = getMissingLocalesContentFromDictionary(
        {
          key: dictionary.key,
          content: node.content,
        },
        projectLocales
      );

      // Only translate requested locales that are actually missing
      const requestedMissingLocales = targetLocales.filter((locale) =>
        missingLocales.includes(locale)
      );

      if (requestedMissingLocales.length > 0) {
        dictionaryTargets.push({
          dictionaryId: String(dictionary._id),
          locales: requestedMissingLocales,
        });
      }
    }

    if (dictionaryTargets.length === 0) {
      return reply.send(
        formatResponse({
          data: null,
          message: 'All dictionaries are already translated',
        })
      );
    }

    const job = await addTranslationJob({
      dictionaryTargets,
      projectId: String(project.id),
      userId: String(user.id),
    });

    return reply.send(
      formatResponse<{ jobId: string }>({
        data: { jobId: job.id! },
        message: 'Translation started',
      })
    );
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export const pauseTranslationJob = async (
  request: FastifyRequest<{ Params: { jobId: string } }>,
  reply: FastifyReply
): Promise<void> => {
  const { user } = request.session || {};
  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }
  const { jobId } = request.params;
  const redis = getRedisClient();
  await redis.set(translationPauseKey(jobId), '1', 'EX', 86400);
  return reply.send(formatResponse({ data: { jobId }, message: 'Paused' }));
};

export const resumeTranslationJob = async (
  request: FastifyRequest<{ Params: { jobId: string } }>,
  reply: FastifyReply
): Promise<void> => {
  const { user } = request.session || {};
  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }
  const { jobId } = request.params;
  const redis = getRedisClient();
  await redis.del(translationPauseKey(jobId));
  return reply.send(formatResponse({ data: { jobId }, message: 'Resumed' }));
};

export const stopTranslationJob = async (
  request: FastifyRequest<{ Params: { jobId: string } }>,
  reply: FastifyReply
): Promise<void> => {
  const { user } = request.session || {};
  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }
  const { jobId } = request.params;
  const redis = getRedisClient();
  await redis.set(translationCancelKey(jobId), '1', 'EX', 86400);
  await redis.del(translationPauseKey(jobId));

  const queue = getTranslationQueue();
  const job = await queue.getJob(jobId);
  if (job) {
    const state = await job.getState();
    if (state === 'waiting' || state === 'delayed') {
      await job.remove();
    }
  }
  return reply.send(formatResponse({ data: { jobId }, message: 'Stopped' }));
};

export const retryTranslationJob = async (
  request: FastifyRequest<{ Params: { jobId: string } }>,
  reply: FastifyReply
): Promise<void> => {
  const { user } = request.session || {};
  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }
  const { jobId } = request.params;
  const queue = getTranslationQueue();
  const job = await queue.getJob(jobId);
  if (!job) return reply.status(404).send({ error: 'Job not found' });
  const redis = getRedisClient();
  await redis.del(translationCancelKey(jobId));
  await redis.del(translationPauseKey(jobId));
  await job.retry();
  return reply.send(formatResponse({ data: { jobId }, message: 'Retrying' }));
};

export const restartTranslationJob = async (
  request: FastifyRequest<{ Params: { jobId: string } }>,
  reply: FastifyReply
): Promise<void> => {
  const { user } = request.session || {};
  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }
  const { jobId } = request.params;
  const queue = getTranslationQueue();
  const job = await queue.getJob(jobId);
  if (!job) return reply.status(404).send({ error: 'Job not found' });
  const newJob = await addTranslationJob(job.data);
  return reply.send(
    formatResponse({ data: { jobId: newJob.id! }, message: 'Restarted' })
  );
};

export const getTranslationStatus = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const { project, user } = request.session || {};

  if (!user) {
    reply.raw.statusCode = 401;
    reply.raw.end();
    return;
  }

  reply.hijack();

  const headers = reply.getHeaders();
  Object.entries(headers).forEach(([key, value]) => {
    if (value !== undefined) {
      reply.raw.setHeader(key, value);
    }
  });

  const sseHeaders = {
    'Content-Type': 'text/event-stream; charset=utf-8',
    'Cache-Control': 'no-cache, no-transform',
    Connection: 'keep-alive',
    'X-Accel-Buffering': 'no',
  };

  Object.entries(sseHeaders).forEach(([key, value]) => {
    reply.raw.setHeader(key, value);
  });
  reply.raw.flushHeaders?.();

  reply.raw.write(': connected\n\n');

  const send = (data: any) => {
    if (!reply.raw.writableEnded && !reply.raw.destroyed) {
      reply.raw.write(`data: ${JSON.stringify(data)}\n\n`);
    }
  };

  const projectId = project ? String(project.id) : null;
  const userId = String(user.id);

  const matchesSession = (job: any) =>
    projectId
      ? String(job.data.projectId) === projectId
      : String(job.data.userId) === userId;

  const sendJob = async (job: any) => {
    const state = await job.getState();
    const isPaused = await isTranslationJobPaused(job.id);
    send({
      jobId: job.id,
      state,
      isPaused,
      progress: job.progress,
      data: job.data,
    });
  };

  try {
    const translationQueue = getTranslationQueue();

    const getRelevantJobs = async () => {
      const jobs = await translationQueue.getJobs([
        'active',
        'waiting',
        'delayed',
        'completed',
        'failed',
      ]);
      return jobs.filter(matchesSession);
    };

    const jobs = await getRelevantJobs();
    for (const job of jobs) {
      await sendJob(job);
    }

    const interval = setInterval(async () => {
      try {
        const currentJobs = await translationQueue.getJobs([
          'active',
          'waiting',
          'delayed',
          'completed',
          'failed',
        ]);
        const relevantJobs = currentJobs.filter(matchesSession);
        for (const job of relevantJobs) {
          await sendJob(job);
        }
      } catch (error) {
        logger.error('Error polling translation status', error);
      }
    }, 2000);

    request.raw.on('close', () => {
      clearInterval(interval);
    });
  } catch (error) {
    logger.error('Error in translation status stream', error);
    if (!reply.raw.writableEnded && !reply.raw.destroyed) {
      reply.raw.write(
        `event: error\ndata: ${JSON.stringify({ message: 'Internal Server Error' })}\n\n`
      );
      reply.raw.end();
    }
  }
};
