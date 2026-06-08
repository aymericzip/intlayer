import { getDemoSessionHandler } from '@controllers/demo.controller';
import type { FastifyInstance } from 'fastify';

export const demoRoute = '/api/demo';

export const demoRouter = async (app: FastifyInstance): Promise<void> => {
  app.get('/session', getDemoSessionHandler);
};
