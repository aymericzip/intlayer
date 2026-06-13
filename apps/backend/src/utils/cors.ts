import type { FastifyCorsOptions } from '@fastify/cors';
import { logger } from '@logger';
import type { FastifyRequest } from 'fastify';

/**
 * Origins that are allowed to send/receive session cookies.
 * All other origins (e.g. intlayer-editor embedded in a third-party site)
 * must authenticate via Authorization: Bearer <token> instead.
 */
export const credentialWhitelist = (): string[] =>
  [
    process.env.WEBSITE_URL,
    process.env.APP_URL,
    process.env.SHOWCASE_URL,
  ].filter(Boolean) as string[];

/**
 * CORS configuration with a per-request delegator.
 *
 * Using the `delegator` property (not a bare function) avoids Fastify's
 * avvio plugin loader calling our function as a factory at startup with the
 * Fastify instance instead of a request object.
 *
 * Whitelisted first-party origins → credentials: true (cookie auth works).
 * All other origins              → credentials: false (Bearer token required).
 */
export const corsOptions: FastifyCorsOptions = {
  delegator: (
    req: FastifyRequest,
    cb: (err: Error | null, options: FastifyCorsOptions) => void
  ): void => {
    const origin = req.headers.origin as string | undefined;
    const whitelist = credentialWhitelist();
    const isWhitelisted = Boolean(
      origin &&
        (whitelist.includes(origin) ||
          /^https?:\/\/(?:.*\.)?intlayer\.(?:org|cn)$/.test(origin))
    );

    if (origin && !isWhitelisted) {
      logger.info(
        'non-whitelisted origin, allowing without credentials',
        origin
      );
    }

    cb(null, {
      // Reflect the origin so third-party embeds (intlayer-editor) work.
      // For originless requests (curl, server-to-server) true means allow.
      origin: true,
      credentials: isWhitelisted,
      allowedHeaders: [
        'authorization',
        'Content-Type',
        'cache-control',
        'private-state-token-redemption',
        'private-state-token-issuance',
        'browsing-topics',
      ],
      exposedHeaders: [],
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    });
  },
};
