import {
  addDictionary,
  deleteDictionary,
  getDictionaries,
  updateDictionary,
} from '@controllers/dictionary.controller';
import {
  apiAccessControlMiddleWare,
  AccessRule,
} from '@utils/apiAccessControl';
import { Router } from 'express';

export const dictionaryRouter: Router = Router();

dictionaryRouter.get(
  '/',
  apiAccessControlMiddleWare(
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
  '/',
  apiAccessControlMiddleWare(
    [
      AccessRule.authenticated,
      AccessRule.hasOrganization,
      AccessRule.hasProject,
    ],
    AccessRule.admin
  ),
  addDictionary
);
dictionaryRouter.put(
  '/',
  apiAccessControlMiddleWare(
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
  '/',
  apiAccessControlMiddleWare(
    [
      AccessRule.authenticated,
      AccessRule.hasOrganization,
      AccessRule.hasProject,
    ],
    AccessRule.admin
  ),
  deleteDictionary
);
