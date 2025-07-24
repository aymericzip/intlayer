import type { Routes } from '@/types/Routes';
import {
  addDictionary,
  deleteDictionary,
  getDictionaries,
  getDictionariesKeys,
  getDictionaryByKey,
  pushDictionaries,
  updateDictionary,
} from '@controllers/dictionary.controller';
import { Router } from 'express';

export const dictionaryRouter: Router = Router();

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

dictionaryRouter.get(
  getDictionaryRoutes().getDictionaries.urlModel,
  getDictionaries as any
);

dictionaryRouter.get(
  getDictionaryRoutes().getDictionariesKeys.urlModel,
  getDictionariesKeys as any
);

dictionaryRouter.get(
  getDictionaryRoutes().getDictionary.urlModel,
  getDictionaryByKey as any
);

dictionaryRouter.post(
  getDictionaryRoutes().addDictionary.urlModel,
  addDictionary as any
);
dictionaryRouter.patch(
  getDictionaryRoutes().pushDictionaries.urlModel,
  pushDictionaries as any
);
dictionaryRouter.put(
  getDictionaryRoutes().updateDictionary.urlModel,
  updateDictionary as any
);
dictionaryRouter.delete(
  getDictionaryRoutes().deleteDictionary.urlModel,
  deleteDictionary as any
);
