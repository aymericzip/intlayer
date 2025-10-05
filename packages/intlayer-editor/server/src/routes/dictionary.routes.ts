import {
  getDictionaries,
  writeContentDeclaration,
} from '@controllers/dictionary.controller';
import { getConfiguration } from '@intlayer/config';
import { Router } from 'express';
import type { Routes } from '@/types/Routes';

export const dictionaryRouter: Router = Router();

const { editor } = getConfiguration();

const getBaseURL = () => `${editor.editorURL}/api/dictionary`;

export const getDictionaryRoutes = () =>
  ({
    getDictionaries: {
      urlModel: '/',
      url: getBaseURL(),
      method: 'GET',
    },
    writeContentDeclaration: {
      urlModel: '/',
      url: getBaseURL(),
      method: 'POST',
    },
  }) satisfies Routes;

dictionaryRouter.get(
  getDictionaryRoutes().getDictionaries.urlModel,
  getDictionaries
);
dictionaryRouter.post(
  getDictionaryRoutes().writeContentDeclaration.urlModel,
  writeContentDeclaration
);
