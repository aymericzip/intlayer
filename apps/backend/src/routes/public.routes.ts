import {
  getPublicDictionaries,
  getPublicDictionaryKeys,
} from '@controllers/publicDictionary.controller';
import { createPublicBrowserToken } from '@controllers/publicToken.controller';
import { publicContract } from '@intlayer/backend-contract/public';
import { registerContractRoutes } from '@utils/contract/registerContractRoutes';
import { analyticsIngestLimiter } from '@utils/rateLimiter';
import type { FastifyInstance } from 'fastify';

export const publicRoute = publicContract.prefix;

/** Every public route is rate limited per IP: none needs a confidential credential. */
const rateLimitedOptions = { config: { rateLimit: analyticsIngestLimiter } };

/**
 * The credential-free surface a browser SDK can reach on its own.
 *
 * Every route here is either the token exchange itself or gated by a public
 * browser token scope. Rate limited per IP: none of it is authenticated by a
 * confidential credential, so it must not become an amplifier.
 */
export const publicRouter = async (fastify: FastifyInstance) => {
  registerContractRoutes(fastify, publicContract, {
    createPublicBrowserToken: {
      handler: createPublicBrowserToken,
      options: rateLimitedOptions,
    },
    getPublicDictionaryKeys: {
      handler: getPublicDictionaryKeys,
      options: rateLimitedOptions,
    },
    getPublicDictionaries: {
      handler: getPublicDictionaries,
      options: rateLimitedOptions,
    },
  });
};
