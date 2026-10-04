import {
  getTranslationStatus,
  pauseTranslationJob,
  restartTranslationJob,
  resumeTranslationJob,
  retryTranslationJob,
  stopTranslationJob,
  translateDictionaries,
} from '@controllers/translation.controller';
import { translationContract } from '@intlayer/backend-contract/translation';
import { registerContractRoutes } from '@utils/contract/registerContractRoutes';
import { ErrorHandler } from '@utils/errors';
import { isRedisEnabled } from '@utils/redis/connectRedis';
import type { FastifyInstance } from 'fastify';

export const translateRoute = translationContract.prefix;

export const translationRouter = async (fastify: FastifyInstance) => {
  // Live translations run on a Redis-backed queue
  fastify.addHook('preHandler', async (_request, reply) => {
    if (!isRedisEnabled()) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'LIVE_TRANSLATION_UNAVAILABLE'
      );
    }
  });

  registerContractRoutes(fastify, translationContract, {
    translateDictionaries,
    getTranslationStatus,
    pauseTranslationJob,
    resumeTranslationJob,
    stopTranslationJob,
    retryTranslationJob,
    restartTranslationJob,
  });
};
