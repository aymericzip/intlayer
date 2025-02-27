import * as configurationController from '@controllers/configuration.controller';
import { getConfiguration } from '@intlayer/config';
import { Router } from 'express';
import type { Routes } from '@/types/Routes';

export const configurationRouter: Router = Router();

const { editor } = getConfiguration();

const getBaseURL = () => `${editor.editorURL}/api/dictionary`;

export const getConfigurationRoutes = () =>
  ({
    getConfiguration: {
      urlModel: '/',
      url: getBaseURL(),
      method: 'GET',
    },
  }) satisfies Routes;

configurationRouter.get(
  getConfigurationRoutes().getConfiguration.urlModel,
  configurationController.getConfiguration
);
