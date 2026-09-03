import { logger } from '@logger';
import { verifyCsrf } from '@utils/csrf';
import { handleGenericErrorResponse } from '@utils/errors';
import type { FastifyReply, FastifyRequest } from 'fastify';

/**
 * Path prefix owned by better-auth.
 *
 * better-auth runs its own origin check against its `trustedOrigins` list, and
 * some sign-in flows legitimately POST from an identity provider (Apple's
 * `form_post` response mode, SAML SSO assertions). Guarding those here would
 * reject them, so the framework stays the single authority over its own
 * endpoints.
 */
const BETTER_AUTH_PATH_PREFIX = '/api/auth/';

/**
 * Rejects cookie-authenticated writes coming from an untrusted origin.
 *
 * Registered as a global `onRequest` hook, before authentication runs, so a
 * forged request is dropped without touching the database. See `utils/csrf.ts`
 * for which requests are exempt and why.
 *
 * @param request - The incoming Fastify request.
 * @param reply - The reply, used to short-circuit rejected requests.
 * @returns The reply when the request is rejected, so Fastify stops the chain.
 */
export const csrfMiddleware = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply | undefined> => {
  const pathname = request.url.split('?')[0];

  if (pathname?.startsWith(BETTER_AUTH_PATH_PREFIX)) return;

  const verdict = verifyCsrf(request);
  if (verdict.outcome === 'allowed') return;

  logger.warn('CSRF: rejected cookie-authenticated request', {
    origin: verdict.origin,
    method: request.method,
    url: pathname,
    ip: request.ip,
  });

  handleGenericErrorResponse(reply, 'CSRF_ORIGIN_REJECTED', {
    origin: verdict.origin,
  });

  return reply;
};
