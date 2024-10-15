import {
  pushDictionaries,
  addDictionary,
  deleteDictionary,
  getDictionaries,
  updateDictionary,
} from '@controllers/dictionary.controller';
import { accessControlMiddleWare, AccessRule } from '@utils/accessControl';
import { Router } from 'express';

export const dictionaryRouter: Router = Router();

dictionaryRouter.get(
  '/',
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
  '/',
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
  '/',
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
  '/',
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
  '/',
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
