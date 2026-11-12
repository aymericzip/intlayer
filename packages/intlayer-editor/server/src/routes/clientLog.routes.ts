import { assertSameOrigin } from '@controllers/auth.controller';
import { logClientEvent } from '@controllers/clientLog.controller';
import { getConfiguration } from '@intlayer/config/node';
import type { FastifyInstance } from 'fastify';
import type { Routes } from '@/types/Routes';

const { editor } = getConfiguration();

const getBaseURL = () => `${editor.editorURL}/api/log`;

export const getClientLogRoutes = () =>
  ({
    logClientEvent: {
      urlModel: '/',
      url: getBaseURL(),
      method: 'POST',
    },
  }) satisfies Routes;

export const clientLogRouter = async (fastify: FastifyInstance) => {
  // Only the editor client may print in the terminal, not any open page
  fastify.addHook('onRequest', assertSameOrigin);

  fastify.post(getClientLogRoutes().logClientEvent.urlModel, logClientEvent);
};
