import { writeContentDeclaration } from '@controllers/dictionary.controller';
import { getConfiguration } from '@intlayer/config/client';
import { Router } from 'express';
import { Routes } from '@/types/Routes';

export const dictionaryRouter: Router = Router();

const { editor } = getConfiguration();

const baseURL = `${editor.applicationURL}/api/dictionary`;

export const dictionaryRoutes = {
  writeContentDeclaration: {
    urlModel: '/',
    url: baseURL,
    method: 'POST',
  },
} satisfies Routes;

dictionaryRouter.post(
  dictionaryRoutes.writeContentDeclaration.urlModel,
  writeContentDeclaration
);
