import {
  authCallback,
  checkConfig,
  getAuthUrl,
  getConfigFile,
  listProjects,
} from '@controllers/gitlab.controller';
import { gitlabContract } from '@intlayer/backend-contract/gitProviders';
import { registerContractRoutes } from '@utils/contract/registerContractRoutes';
import type { FastifyInstance } from 'fastify';

export const gitlabRoute = gitlabContract.prefix;

export const gitlabRouter = async (fastify: FastifyInstance) => {
  registerContractRoutes(fastify, gitlabContract, {
    getAuthUrl,
    authCallback,
    listProjects,
    checkConfig,
    getConfigFile,
  });
};
