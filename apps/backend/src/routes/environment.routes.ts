import {
  addEnvironment,
  deleteEnvironment,
  migrateEnvironment,
  resetToProductionEnvironment,
  selectEnvironment,
  updateEnvironment,
} from '@controllers/environment.controller';
import type { FastifyInstance } from 'fastify';
import type { Routes } from '@/types/Routes';
import { environmentIdParamsSchema } from './paramsSchemas';

export const environmentRoute = '/api/project/environment';

const baseURL = () => `${process.env.BACKEND_URL}${environmentRoute}`;

export const getEnvironmentRoutes = () =>
  ({
    addEnvironment: {
      urlModel: '/',
      url: baseURL(),
      method: 'POST',
    },
    updateEnvironment: {
      urlModel: '/:environmentId',
      url: ({ environmentId }: { environmentId: string }) =>
        `${baseURL()}/${environmentId}`,
      method: 'PUT',
    },
    deleteEnvironment: {
      urlModel: '/:environmentId',
      url: ({ environmentId }: { environmentId: string }) =>
        `${baseURL()}/${environmentId}`,
      method: 'DELETE',
    },
    selectEnvironment: {
      urlModel: '/:environmentId/select',
      url: ({ environmentId }: { environmentId: string }) =>
        `${baseURL()}/${environmentId}/select`,
      method: 'PUT',
    },
    resetToProductionEnvironment: {
      urlModel: '/production/select',
      url: `${baseURL()}/production/select`,
      method: 'PUT',
    },
    migrateEnvironment: {
      urlModel: '/migrate',
      url: `${baseURL()}/migrate`,
      method: 'POST',
    },
  }) satisfies Routes;

export const environmentRouter = async (fastify: FastifyInstance) => {
  fastify.post(getEnvironmentRoutes().addEnvironment.urlModel, addEnvironment);
  fastify.put(
    getEnvironmentRoutes().updateEnvironment.urlModel,
    { schema: { params: environmentIdParamsSchema } },
    updateEnvironment
  );
  fastify.delete(
    getEnvironmentRoutes().deleteEnvironment.urlModel,
    { schema: { params: environmentIdParamsSchema } },
    deleteEnvironment
  );
  // Must be registered before /:environmentId/select to avoid route conflict
  fastify.put(
    getEnvironmentRoutes().resetToProductionEnvironment.urlModel,
    resetToProductionEnvironment
  );
  fastify.put(
    getEnvironmentRoutes().selectEnvironment.urlModel,
    { schema: { params: environmentIdParamsSchema } },
    selectEnvironment
  );
  fastify.post(
    getEnvironmentRoutes().migrateEnvironment.urlModel,
    migrateEnvironment
  );
};
