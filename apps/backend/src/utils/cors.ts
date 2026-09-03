import type { FastifyCorsOptions } from '@fastify/cors';
import { logger } from '@logger';
import { isTrustedOrigin } from '@utils/trustedOrigins';
import type { FastifyRequest } from 'fastify';

/**
 * CORS configuration with a per-request delegator.
 *
 * Using the `delegator` property (not a bare function) avoids Fastify's
 * avvio plugin loader calling our function as a factory at startup with the
 * Fastify instance instead of a request object.
 *
 * Trusted first-party origins → credentials: true (cookie auth works).
 * All other origins            → credentials: false (Bearer token required).
 *
 * The trust decision lives in `utils/trustedOrigins.ts`, shared with the CSRF
 * hook so an origin can never be allowed to send cookies here yet be refused
 * there — or the reverse.
 */
export const corsOptions: FastifyCorsOptions = {
  delegator: (
    req: FastifyRequest,
    cb: (err: Error | null, options: FastifyCorsOptions) => void
  ): void => {
    const origin = req.headers.origin as string | undefined;
    const isWhitelisted = isTrustedOrigin(origin);

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
        'x-file-name',
        'x-alt-text',
        'x-caption',
      ],
      exposedHeaders: [],
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    });
  },
};
