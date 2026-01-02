import {
  authCallback,
  checkConfig,
  getAuthUrl,
  getConfigFile,
  listRepos,
} from '@controllers/github.controller';
import type { FastifyInstance } from 'fastify';
import type { Routes } from '@/types/Routes';

export const githubRoute = '/api/github';

const baseURL = () => `${process.env.BACKEND_URL}${githubRoute}`;

export const getGithubRoutes = () =>
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
    listRepos: {
      urlModel: '/repos',
      url: `${baseURL()}/repos`,
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

export const githubRouter = async (fastify: FastifyInstance) => {
  fastify.get(getGithubRoutes().getAuthUrl.urlModel, getAuthUrl);
  fastify.post(getGithubRoutes().authCallback.urlModel, authCallback);
  fastify.get(getGithubRoutes().listRepos.urlModel, listRepos);
  fastify.post(getGithubRoutes().checkConfig.urlModel, checkConfig);
  fastify.post(getGithubRoutes().getConfigFile.urlModel, getConfigFile);
};
