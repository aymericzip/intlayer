import {
  pushDictionaries,
  addDictionary,
  deleteDictionary,
  getDictionaries,
  updateDictionary,
} from '@controllers/dictionary.controller';
import { accessControlMiddleWare, AccessRule } from '@utils/accessControl';
import { Router } from 'express';
import { Routes } from '@/types/Routes';

export const dictionaryRouter: Router = Router();

const baseURL = `${process.env.CLIENT_URL}/api/dictionary`;

export const dictionaryRoutes = {
  getDictionaries: {
    urlModel: '/',
    url: baseURL,
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
    urlModel: '/',
    url: baseURL,
    method: 'DELETE',
  },
} satisfies Routes;

dictionaryRouter.get(
  dictionaryRoutes.getDictionaries.urlModel,
  accessControlMiddleWare(
    [
      AccessRule.authenticated,
      AccessRule.hasOrganization,
      AccessRule.hasProject,
    ],
    AccessRule.admin
  ),
  getDictionaries
);

dictionaryRouter.post(
  dictionaryRoutes.addDictionary.urlModel,
  accessControlMiddleWare(
    [
      AccessRule.authenticated,
      AccessRule.hasOrganization,
      AccessRule.hasProject,
    ],
    AccessRule.admin
  ),
  addDictionary
);
dictionaryRouter.patch(
  dictionaryRoutes.pushDictionaries.urlModel,
  accessControlMiddleWare(
    [
      AccessRule.authenticated,
      AccessRule.hasOrganization,
      AccessRule.hasProject,
    ],
    AccessRule.admin
  ),
  pushDictionaries
);
dictionaryRouter.put(
  dictionaryRoutes.updateDictionary.urlModel,
  accessControlMiddleWare(
    [
      AccessRule.authenticated,
      AccessRule.hasOrganization,
      AccessRule.hasProject,
    ],
    AccessRule.admin
  ),
  updateDictionary
);
dictionaryRouter.delete(
  dictionaryRoutes.deleteDictionary.urlModel,
  accessControlMiddleWare(
    [
      AccessRule.authenticated,
      AccessRule.hasOrganization,
      AccessRule.hasProject,
    ],
    AccessRule.admin
  ),
  deleteDictionary
);
