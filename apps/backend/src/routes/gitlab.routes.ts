import {
  authCallback,
  checkConfig,
  getAuthUrl,
  getConfigFile,
  listProjects,
} from '@controllers/gitlab.controller';
import type { FastifyInstance } from 'fastify';
import type { Routes } from '@/types/Routes';

export const gitlabRoute = '/api/gitlab';

const baseURL = () => `${process.env.BACKEND_URL}${gitlabRoute}`;

export const getGitlabRoutes = () =>
  ({
    getAuthUrl: {
      urlModel: '/auth-url',
      url: `${baseURL()}/auth-url`,
      method: 'GET',
    },
    authCallback: {
      urlModel: '/auth',
      url: `${baseURL()}/auth`,
      method: 'POST',
    },
    listProjects: {
      urlModel: '/projects',
      url: `${baseURL()}/projects`,
      method: 'GET',
    },
    checkConfig: {
      urlModel: '/check-config',
      url: `${baseURL()}/check-config`,
      method: 'POST',
    },
    getConfigFile: {
      urlModel: '/get-config-file',
      url: `${baseURL()}/get-config-file`,
      method: 'POST',
    },
  }) satisfies Routes;

export const gitlabRouter = async (fastify: FastifyInstance) => {
  fastify.get(getGitlabRoutes().getAuthUrl.urlModel, getAuthUrl);
  fastify.post(getGitlabRoutes().authCallback.urlModel, authCallback);
  fastify.get(getGitlabRoutes().listProjects.urlModel, listProjects);
  fastify.post(getGitlabRoutes().checkConfig.urlModel, checkConfig);
  fastify.post(getGitlabRoutes().getConfigFile.urlModel, getConfigFile);
};
