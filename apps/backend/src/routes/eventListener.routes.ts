import { listenChangeSSE } from '@controllers/eventListener.controller';
import type { FastifyInstance } from 'fastify';
import type { Routes } from '@/types/Routes';

export const eventListenerRoute = '/api/event-listener';

const baseURL = () => `${process.env.BACKEND_URL}${eventListenerRoute}`;

export const eventListenerRoutes = () =>
  ({
    checkDictionaryChangeSSE: {
      urlModel: '/',
      url: baseURL(),
      method: 'GET',
    },
  }) satisfies Routes;

export const eventListenerRouter = async (fastify: FastifyInstance) => {
  fastify.get(
    eventListenerRoutes().checkDictionaryChangeSSE.urlModel,
    listenChangeSSE
  );
};
