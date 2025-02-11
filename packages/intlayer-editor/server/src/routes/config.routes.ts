import * as configurationController from '@controllers/configuration.controller';
import { getConfiguration } from '@intlayer/config/client';
import { Router } from 'express';
import type { Routes } from '@/types/Routes';

export const configurationRouter: Router = Router();

const { editor } = getConfiguration();

const baseURL = `${editor.editorURL}/api/dictionary`;

export const configurationRoutes = {
  getConfiguration: {
    urlModel: '/',
    url: baseURL,
    method: 'GET',
  },
} satisfies Routes;

configurationRouter.get(
  configurationRoutes.getConfiguration.urlModel,
  configurationController.getConfiguration
);
