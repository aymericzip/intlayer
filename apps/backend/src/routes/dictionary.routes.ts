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
import { Routes } from '@/types/Routes';

export const dictionaryRouter: Router = Router();

const baseURL = `${process.env.BACKEND_URL}/api/dictionary`;

export const dictionaryRoutes = {
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
    urlModel: '/',
    url: baseURL,
    method: 'PUT',
  },
  deleteDictionary: {
    urlModel: '/:dictionaryId',
    url: ({ dictionaryId }: { dictionaryId: string }) =>
      `${baseURL}/${dictionaryId}`,
    method: 'DELETE',
  },
} satisfies Routes;

dictionaryRouter.get(
  dictionaryRoutes.getDictionaries.urlModel,
  getDictionaries
);

dictionaryRouter.get(
  dictionaryRoutes.getDictionariesKeys.urlModel,
  getDictionariesKeys
);

dictionaryRouter.get(
  dictionaryRoutes.getDictionary.urlModel,
  getDictionaryByKey
);

dictionaryRouter.post(dictionaryRoutes.addDictionary.urlModel, addDictionary);
dictionaryRouter.patch(
  dictionaryRoutes.pushDictionaries.urlModel,
  pushDictionaries
);
dictionaryRouter.put(
  dictionaryRoutes.updateDictionary.urlModel,
  updateDictionary
);
dictionaryRouter.delete(
  dictionaryRoutes.deleteDictionary.urlModel,
  deleteDictionary
);
