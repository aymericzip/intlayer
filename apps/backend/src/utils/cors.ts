import type { FastifyCorsOptions } from '@fastify/cors';
import { logger } from '@logger';

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

export const corsOptions: FastifyCorsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, server-to-server)
    if (!origin) {
      callback(null, true);
      return;
    }

    if (credentialWhitelist().includes(origin)) {
      callback(null, true);
      return;
    }

    // Non-whitelisted origins (e.g. intlayer-editor on a third-party host):
    // allow the cross-origin request but WITHOUT credential forwarding.
    // Access-Control-Allow-Credentials is NOT set for these origins (see the
    // onSend hook in index.ts), so browsers will not attach or expose cookies.
    // These callers must authenticate via Authorization: Bearer <token>.
    logger.info('non whitelisted origin, allowing without credentials', origin);
    callback(null, true);
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
  // Keep false here; the onSend hook in index.ts selectively sets it to
  // true only for whitelisted origins so that cookie auth works for first-party
  // apps while Bearer-token callers (editor, CLI, MCP) are unaffected.
  credentials: false,
};
