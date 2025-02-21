import {
  pushDictionaries,
  addDictionary,
  deleteDictionary,
  getDictionaries,
  updateDictionary,
  getDictionaryByKey,
  getDictionariesKeys,
} from '@controllers/dictionary.controller';
import { Router } from 'express';
import type { Routes } from '@/types/Routes';

export const dictionaryRouter: Router = Router();

const baseURL = () => `${process.env.BACKEND_URL}/api/dictionary`;

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
  getDictionaries
);

dictionaryRouter.get(
  getDictionaryRoutes().getDictionariesKeys.urlModel,
  getDictionariesKeys
);

dictionaryRouter.get(
  getDictionaryRoutes().getDictionary.urlModel,
  getDictionaryByKey
);

dictionaryRouter.post(
  getDictionaryRoutes().addDictionary.urlModel,
  addDictionary
);
dictionaryRouter.patch(
  getDictionaryRoutes().pushDictionaries.urlModel,
  pushDictionaries
);
dictionaryRouter.put(
  getDictionaryRoutes().updateDictionary.urlModel,
  updateDictionary
);
dictionaryRouter.delete(
  getDictionaryRoutes().deleteDictionary.urlModel,
  deleteDictionary
);
