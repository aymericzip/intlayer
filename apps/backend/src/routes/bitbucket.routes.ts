import {
  authCallback,
  checkConfig,
  getAuthUrl,
  getConfigFile,
  listRepos,
} from '@controllers/bitbucket.controller';
import { bitbucketContract } from '@intlayer/backend-contract/gitProviders';
import { registerContractRoutes } from '@utils/contract/registerContractRoutes';
import type { FastifyInstance } from 'fastify';

export const bitbucketRoute = bitbucketContract.prefix;

export const bitbucketRouter = async (fastify: FastifyInstance) => {
  registerContractRoutes(fastify, bitbucketContract, {
    getAuthUrl,
    authCallback,
    listRepos,
    checkConfig,
    getConfigFile,
  });
};
