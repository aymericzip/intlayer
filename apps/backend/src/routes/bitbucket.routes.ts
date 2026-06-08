import {
  authCallback,
  checkConfig,
  getAuthUrl,
  getConfigFile,
  listRepos,
} from '@controllers/bitbucket.controller';
import type { FastifyInstance } from 'fastify';
import type { Routes } from '@/types/Routes';

export const bitbucketRoute = '/api/bitbucket';

const baseURL = () => `${process.env.BACKEND_URL}${bitbucketRoute}`;

export const getBitbucketRoutes = () =>
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

export const bitbucketRouter = async (fastify: FastifyInstance) => {
  fastify.get(getBitbucketRoutes().getAuthUrl.urlModel, getAuthUrl);
  fastify.post(getBitbucketRoutes().authCallback.urlModel, authCallback);
  fastify.get(getBitbucketRoutes().listRepos.urlModel, listRepos);
  fastify.post(getBitbucketRoutes().checkConfig.urlModel, checkConfig);
  fastify.post(getBitbucketRoutes().getConfigFile.urlModel, getConfigFile);
};
