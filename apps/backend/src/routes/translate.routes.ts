import {
  getTranslationStatus,
  translateDictionaries,
} from '@controllers/translation.controller';
import type { FastifyInstance } from 'fastify';
import type { Routes } from '@/types/Routes';

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
};
