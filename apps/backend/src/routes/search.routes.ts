import { searchDocUtil } from '@controllers/search.controller';
import type { FastifyInstance } from 'fastify';
import type { Routes } from '@/types/Routes';

export const searchRoute = '/api/search';

const baseURL = () => `${process.env.BACKEND_URL}${searchRoute}`;

export const getSearchRoutes = () =>
  ({
    doc: {
      urlModel: '/doc',
      url: `${baseURL()}/doc`,
      method: 'GET',
    },
  }) satisfies Routes;

export const searchRouter = async (fastify: FastifyInstance) => {
  fastify.get(getSearchRoutes().doc.urlModel, searchDocUtil);
};
