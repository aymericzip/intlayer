import { searchDocUtil } from '@controllers/searchDoc.controller';
import { searchContract } from '@intlayer/backend-contract/search';
import { registerContractRoutes } from '@utils/contract/registerContractRoutes';
import type { FastifyInstance } from 'fastify';

export const searchRoute = searchContract.prefix;

export const searchRouter = async (fastify: FastifyInstance) => {
  registerContractRoutes(fastify, searchContract, {
    doc: searchDocUtil,
  });
};
