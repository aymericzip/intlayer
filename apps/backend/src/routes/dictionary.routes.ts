import {
  addDictionary,
  deleteDictionary,
  getDictionaries,
  getDictionariesByKeys,
  getDictionariesKeys,
  getDictionariesUpdateTimestamp,
  getDictionaryByKey,
  pushDictionaries,
  updateDictionary,
} from '@controllers/dictionary.controller';
import type { FastifyInstance } from 'fastify';
import type { Routes } from '@/types/Routes';
import {
  dictionaryIdParamsSchema,
  dictionaryKeyParamsSchema,
  dictionaryKeysQuerySchema,
} from './paramsSchemas';

export const dictionaryRoute = '/api/dictionary';

const baseURL = () => `${process.env.BACKEND_URL}${dictionaryRoute}`;

export const getDictionaryRoutes = () =>
  ({
    getDictionaries: {
      urlModel: '/',
      url: baseURL,
      method: 'GET',
    },
    getDictionariesKeys: {
      urlModel: '/keys',
      url: `${baseURL}/keys`,
      method: 'GET',
    },
    getDictionariesUpdateTimestamp: {
      urlModel: '/update',
      url: `${baseURL}/update`,
      method: 'GET',
    },
    getDictionariesByKeys: {
      urlModel: '/by-keys',
      url: `${baseURL}/by-keys`,
      method: 'GET',
    },
    getDictionary: {
      urlModel: '/:dictionaryKey',
      url: ({ dictionaryKey }: { dictionaryKey: string }) =>
        `${baseURL}/${dictionaryKey}`,
      method: 'GET',
    },
    addDictionary: {
      urlModel: '/',
      url: baseURL,
      method: 'POST',
    },
    pushDictionaries: {
      urlModel: '/',
      url: baseURL,
      method: 'PATCH',
    },
    updateDictionary: {
      urlModel: '/:dictionaryId',
      url: ({ dictionaryId }: { dictionaryId: string }) =>
        `${baseURL}/${dictionaryId}`,
      method: 'PUT',
    },
    deleteDictionary: {
      urlModel: '/:dictionaryId',
      url: ({ dictionaryId }: { dictionaryId: string }) =>
        `${baseURL}/${dictionaryId}`,
      method: 'DELETE',
    },
  }) satisfies Routes;

export const dictionaryRouter = async (fastify: FastifyInstance) => {
  fastify.get(getDictionaryRoutes().getDictionaries.urlModel, getDictionaries);
  fastify.get(
    getDictionaryRoutes().getDictionariesKeys.urlModel,
    getDictionariesKeys
  );
  fastify.get(
    getDictionaryRoutes().getDictionariesUpdateTimestamp.urlModel,
    getDictionariesUpdateTimestamp
  );
  fastify.get(
    getDictionaryRoutes().getDictionariesByKeys.urlModel,
    { schema: { querystring: dictionaryKeysQuerySchema } },
    getDictionariesByKeys
  );
  fastify.get(
    getDictionaryRoutes().getDictionary.urlModel,
    { schema: { params: dictionaryKeyParamsSchema } },
    getDictionaryByKey
  );
  fastify.post(getDictionaryRoutes().addDictionary.urlModel, addDictionary);
  fastify.patch(
    getDictionaryRoutes().pushDictionaries.urlModel,
    pushDictionaries
  );
  fastify.put(
    getDictionaryRoutes().updateDictionary.urlModel,
    { schema: { params: dictionaryIdParamsSchema } },
    updateDictionary
  );
  fastify.delete(
    getDictionaryRoutes().deleteDictionary.urlModel,
    { schema: { params: dictionaryIdParamsSchema } },
    deleteDictionary
  );
};
