import type { FastifyCorsOptions } from '@fastify/cors';
import { logger } from '@logger';

const whitelist = [process.env.CLIENT_URL!];

export const corsOptions: FastifyCorsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      callback(null, true);
      return;
    }

    if (whitelist.includes(origin)) {
      logger.info('whitelisted origin', origin);
      callback(null, true);
      return;
    }

    logger.info('non whitelisted origin', origin);
    // Reflect the request's origin (echo back the origin header)
    callback(null, origin);
  },
  allowedHeaders: [
    'authorization',
    'Content-Type',
    'credentials',
    'cache-control',
    'Access-Control-Allow-Origin',
    'private-state-token-redemption',
    'private-state-token-issuance',
    'browsing-topics',
  ],
  exposedHeaders: [''],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  credentials: true,
};
