import { Backend_Root } from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import { IS_SELF_HOSTED } from '#utils/selfHosted';

/** Discovery documents are cached by agents for five minutes (MPP spec). */
const CACHE_CONTROL = 'public, max-age=300';

/**
 * MPP discovery document (`/openapi.json`) for agents that start from the
 * dashboard's origin.
 *
 * The paid routes — and the live Stripe price they charge — belong to the API,
 * so the backend generates the document and this route relays it. Its
 * `servers` entry is absolute, sending agents to the API from here too.
 *
 * Answers 404 when the API does not offer agent payments (self-hosted, or no
 * Stripe business profile), so nothing is advertised that cannot be bought.
 *
 * @see https://mpp.dev/advanced/discovery
 */
export const Route = createFileRoute('/openapi.json')({
  server: {
    handlers: {
      GET: async () => {
        if (IS_SELF_HOSTED) {
          return new Response('Not found', { status: 404 });
        }

        try {
          const response = await fetch(`${Backend_Root}/openapi.json`, {
            headers: { Accept: 'application/json' },
            signal: AbortSignal.timeout(5000),
          });

          if (!response.ok) {
            return new Response('Not found', { status: 404 });
          }

          return new Response(await response.text(), {
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
              'Cache-Control': CACHE_CONTROL,
              'Access-Control-Allow-Origin': '*',
            },
          });
        } catch {
          return new Response('Discovery document unavailable', {
            status: 503,
            headers: { 'Retry-After': '60' },
          });
        }
      },
    },
  },
});
