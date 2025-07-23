import { logger } from '@logger';
import { CorsOptions } from 'cors';

const whitelist = [process.env.CLIENT_URL!];

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (whitelist.includes(origin)) {
      logger.info('whitelisted origin', origin);
      return callback(null, true);
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
  preflightContinue: false,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};
