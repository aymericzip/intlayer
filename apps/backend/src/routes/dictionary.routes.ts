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

export const dictionaryRoutes = {
  getDictionaries: {
    urlModel: '/',
    url: '/',
    method: 'GET',
  },
  addDictionary: {
    urlModel: '/',
    url: '/',
    method: 'POST',
  },
  pushDictionaries: {
    urlModel: '/',
    url: '/',
    method: 'PATCH',
  },
  updateDictionary: {
    urlModel: '/',
    url: '/',
    method: 'PUT',
  },
  deleteDictionary: {
    urlModel: '/',
    url: '/',
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
