import { listenChangeSSE } from '@controllers/eventListener.controller';
import { eventListenerContract } from '@intlayer/backend-contract/eventListener';
import { registerContractRoutes } from '@utils/contract/registerContractRoutes';
import type { FastifyInstance } from 'fastify';

export const eventListenerRoute = eventListenerContract.prefix;

export const eventListenerRouter = async (fastify: FastifyInstance) => {
  registerContractRoutes(fastify, eventListenerContract, {
    checkDictionaryChangeSSE: listenChangeSSE,
  });
};
