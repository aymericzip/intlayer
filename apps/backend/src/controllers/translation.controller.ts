import type { Locale } from '@intlayer/types';
import { logger } from '@logger';
import {
  addTranslationJob,
  getTranslationQueue,
} from '@services/translationQueue.service';
import { type AppError, ErrorHandler } from '@utils/errors';
import { formatResponse, type ResponseData } from '@utils/responseData';
import type { FastifyReply, FastifyRequest } from 'fastify';

export type TranslateDictionariesBody = {
  dictionaryIds: string[];
  targetLocales: Locale[];
};
export type TranslateDictionariesResult = ResponseData<{ jobId: string }>;

export const translateDictionaries = async (
  request: FastifyRequest<{ Body: TranslateDictionariesBody }>,
  reply: FastifyReply
): Promise<void> => {
  const { project, user } = request.locals || {};
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
    const job = await addTranslationJob({
      dictionaryIds,
      targetLocales,
      projectId: String(project.id),
      userId: String(user.id),
    });

    const responseData = formatResponse<{ jobId: string }>({
      data: { jobId: job.id! },
      message: 'Translation started',
    });

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export const getTranslationStatus = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const { project, user } = request.locals || {};

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

  // Send initial data to ensure the connection is open
  reply.raw.write(': connected\n\n');

  const send = (data: any) => {
    if (!reply.raw.writableEnded && !reply.raw.destroyed) {
      reply.raw.write(`data: ${JSON.stringify(data)}\n\n`);
    }
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

      if (project) {
        return jobs.filter((job) => job.data.projectId === project.id);
      }
      return jobs.filter((job) => job.data.userId === user.id);
    };

    // Send initial state
    const jobs = await getRelevantJobs();
    for (const job of jobs) {
      const state = await job.getState();
      send({ jobId: job.id, state, progress: job.progress, data: job.data });
    }

    // Polling interval for updates
    const interval = setInterval(async () => {
      try {
        const currentJobs = await translationQueue.getJobs([
          'active',
          'waiting',
          'delayed',
        ]);

        const relevantJobs = project
          ? currentJobs.filter((job) => job.data.projectId === project.id)
          : currentJobs.filter((job) => job.data.userId === user.id);

        for (const job of relevantJobs) {
          const state = await job.getState();
          send({ jobId: job.id, state, progress: job.progress });
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
