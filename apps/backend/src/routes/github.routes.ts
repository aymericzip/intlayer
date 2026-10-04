import {
  authCallback,
  checkConfig,
  getAuthUrl,
  getConfigFile,
  getToken,
  listRepos,
} from '@controllers/github.controller';
import { githubContract } from '@intlayer/backend-contract/gitProviders';
import { registerContractRoutes } from '@utils/contract/registerContractRoutes';
import type { FastifyInstance } from 'fastify';

export const githubRoute = githubContract.prefix;

export const githubRouter = async (fastify: FastifyInstance) => {
  registerContractRoutes(fastify, githubContract, {
    getAuthUrl,
    authCallback,
    listRepos,
    checkConfig,
    getConfigFile,
    getToken,
  });
};
