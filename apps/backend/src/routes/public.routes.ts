import {
  getPublicDictionaries,
  getPublicDictionaryKeys,
} from '@controllers/publicDictionary.controller';
import { createPublicBrowserToken } from '@controllers/publicToken.controller';
import { analyticsIngestLimiter } from '@utils/rateLimiter';
import type { FastifyInstance } from 'fastify';
import type { Routes } from '@/types/Routes';

export const publicRoute = '/api/public';

const baseURL = () => `${process.env.BACKEND_URL}${publicRoute}`;

export const getPublicRoutes = () =>
  ({
    createPublicBrowserToken: {
      urlModel: '/token',
      url: `${baseURL()}/token`,
      method: 'POST',
    },
    getPublicDictionaryKeys: {
      urlModel: '/dictionaries/keys',
      url: `${baseURL()}/dictionaries/keys`,
      method: 'GET',
    },
    getPublicDictionaries: {
      urlModel: '/dictionaries',
      url: `${baseURL()}/dictionaries`,
      method: 'GET',
    },
  }) satisfies Routes;

/**
 * The credential-free surface a browser SDK can reach on its own.
 *
 * Every route here is either the token exchange itself or gated by a public
 * browser token scope. Rate limited per IP: none of it is authenticated by a
 * confidential credential, so it must not become an amplifier.
 */
export const publicRouter = async (fastify: FastifyInstance) => {
  fastify.post(
    getPublicRoutes().createPublicBrowserToken.urlModel,
    { config: { rateLimit: analyticsIngestLimiter } },
    createPublicBrowserToken
  );

  fastify.get(
    getPublicRoutes().getPublicDictionaryKeys.urlModel,
    { config: { rateLimit: analyticsIngestLimiter } },
    getPublicDictionaryKeys
  );

  fastify.get(
    getPublicRoutes().getPublicDictionaries.urlModel,
    { config: { rateLimit: analyticsIngestLimiter } },
    getPublicDictionaries
  );
};
