import {
  addDictionary,
  deleteDictionary,
  getDictionaries,
  getDictionariesKeys,
  getDictionariesUpdateTimestamp,
  getDictionaryByKey,
  pushDictionaries,
  updateDictionary,
} from '@controllers/dictionary.controller';
import type { FastifyInstance } from 'fastify';
import type { Routes } from '@/types/Routes';

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
  fastify.get(getDictionaryRoutes().getDictionary.urlModel, getDictionaryByKey);
  fastify.post(getDictionaryRoutes().addDictionary.urlModel, addDictionary);
  fastify.patch(
    getDictionaryRoutes().pushDictionaries.urlModel,
    pushDictionaries
  );
  fastify.put(
    getDictionaryRoutes().updateDictionary.urlModel,
    updateDictionary
  );
  fastify.delete(
    getDictionaryRoutes().deleteDictionary.urlModel,
    deleteDictionary
  );
};
