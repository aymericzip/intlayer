import { writeContentDeclaration } from '@controllers/dictionary.controller';
import { getConfiguration } from '@intlayer/config';
import { Router } from 'express';
import type { Routes } from '@/types/Routes';

export const dictionaryRouter: Router = Router();

const { editor } = getConfiguration();

const getBaseURL = () => `${editor.editorURL}/api/dictionary`;

export const getDictionaryRoutes = () =>
  ({
    writeContentDeclaration: {
      urlModel: '/',
      url: getBaseURL(),
      method: 'POST',
    },
  }) satisfies Routes;

dictionaryRouter.post(
  getDictionaryRoutes().writeContentDeclaration.urlModel,
  writeContentDeclaration
);
