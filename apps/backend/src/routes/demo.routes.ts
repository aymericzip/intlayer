import { getDemoSessionHandler } from '@controllers/demo.controller';
import { demoContract } from '@intlayer/backend-contract/demo';
import { registerContractRoutes } from '@utils/contract/registerContractRoutes';
import type { FastifyInstance } from 'fastify';

export const demoRoute = demoContract.prefix;

export const demoRouter = async (fastify: FastifyInstance): Promise<void> => {
  registerContractRoutes(fastify, demoContract, {
    getDemoSession: getDemoSessionHandler,
  });
};
