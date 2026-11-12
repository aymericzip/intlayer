import {
  assertSameOrigin,
  getEditorAuth,
  logout,
  startLogin,
} from '@controllers/auth.controller';
import { getConfiguration } from '@intlayer/config/node';
import type { FastifyInstance } from 'fastify';
import type { Routes } from '@/types/Routes';

const { editor } = getConfiguration();

const getBaseURL = () => `${editor.editorURL}/api/auth`;

export const getAuthRoutes = () =>
  ({
    getEditorAuth: {
      urlModel: '/',
      url: getBaseURL(),
      method: 'GET',
    },
    startLogin: {
      urlModel: '/login',
      url: `${getBaseURL()}/login`,
      method: 'POST',
    },
    logout: {
      urlModel: '/logout',
      url: `${getBaseURL()}/logout`,
      method: 'POST',
    },
  }) satisfies Routes;

export const authRouter = async (fastify: FastifyInstance) => {
  fastify.addHook('onRequest', assertSameOrigin);

  fastify.get(getAuthRoutes().getEditorAuth.urlModel, getEditorAuth);
  fastify.post(getAuthRoutes().startLogin.urlModel, startLogin);
  fastify.post(getAuthRoutes().logout.urlModel, logout);
};
