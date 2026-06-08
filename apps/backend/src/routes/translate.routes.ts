import {
  getTranslationStatus,
  pauseTranslationJob,
  restartTranslationJob,
  resumeTranslationJob,
  retryTranslationJob,
  stopTranslationJob,
  translateDictionaries,
} from '@controllers/translation.controller';
import type { FastifyInstance } from 'fastify';
import type { Routes } from '@/types/Routes';
import { jobIdParamsSchema } from './paramsSchemas';

export const translateRoute = '/api/translate';

const baseURL = () => `${process.env.BACKEND_URL}${translateRoute}`;

export const getTranslationsRoutes = () =>
  ({
    translateDictionaries: {
      urlModel: '/dictionaries',
      url: `${baseURL()}/dictionaries`,
      method: 'POST',
    },
    getTranslationStatus: {
      urlModel: '/status',
      url: `${baseURL()}/status`,
      method: 'GET',
    },
    pauseTranslationJob: {
      urlModel: '/:jobId/pause',
      url: ({ jobId }: { jobId: string }) => `${baseURL()}/${jobId}/pause`,
      method: 'POST',
    },
    resumeTranslationJob: {
      urlModel: '/:jobId/resume',
      url: ({ jobId }: { jobId: string }) => `${baseURL()}/${jobId}/resume`,
      method: 'POST',
    },
    stopTranslationJob: {
      urlModel: '/:jobId/stop',
      url: ({ jobId }: { jobId: string }) => `${baseURL()}/${jobId}/stop`,
      method: 'POST',
    },
    retryTranslationJob: {
      urlModel: '/:jobId/retry',
      url: ({ jobId }: { jobId: string }) => `${baseURL()}/${jobId}/retry`,
      method: 'POST',
    },
    restartTranslationJob: {
      urlModel: '/:jobId/restart',
      url: ({ jobId }: { jobId: string }) => `${baseURL()}/${jobId}/restart`,
      method: 'POST',
    },
  }) satisfies Routes;

export const translationRouter = async (fastify: FastifyInstance) => {
  fastify.post(
    getTranslationsRoutes().translateDictionaries.urlModel,
    translateDictionaries
  );
  fastify.get(
    getTranslationsRoutes().getTranslationStatus.urlModel,
    getTranslationStatus
  );
  fastify.post(
    getTranslationsRoutes().pauseTranslationJob.urlModel,
    { schema: { params: jobIdParamsSchema } },
    pauseTranslationJob
  );
  fastify.post(
    getTranslationsRoutes().resumeTranslationJob.urlModel,
    { schema: { params: jobIdParamsSchema } },
    resumeTranslationJob
  );
  fastify.post(
    getTranslationsRoutes().stopTranslationJob.urlModel,
    { schema: { params: jobIdParamsSchema } },
    stopTranslationJob
  );
  fastify.post(
    getTranslationsRoutes().retryTranslationJob.urlModel,
    { schema: { params: jobIdParamsSchema } },
    retryTranslationJob
  );
  fastify.post(
    getTranslationsRoutes().restartTranslationJob.urlModel,
    { schema: { params: jobIdParamsSchema } },
    restartTranslationJob
  );
};
