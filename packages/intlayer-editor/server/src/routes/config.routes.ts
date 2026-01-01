import * as configurationController from '@controllers/configuration.controller';
import { getConfiguration } from '@intlayer/config';
import type { FastifyInstance } from 'fastify';
import type { Routes } from '@/types/Routes';

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

export const configurationRouter = async (fastify: FastifyInstance) => {
  fastify.get(
    getConfigurationRoutes().getConfiguration.urlModel,
    configurationController.getConfiguration
  );
};
