import { Backend_Root } from '@intlayer/design-system/routes';

/** Discovery documents are cached by agents for five minutes (MPP spec). */
const CACHE_CONTROL = 'public, max-age=300';

/** The only part of `fetch` the relay uses, so tests can pass a plain function. */
export type FetchDocument = (
  url: string,
  init?: RequestInit
) => Promise<Response>;

const notFound = (): Response => new Response('Not found', { status: 404 });

/**
 * Relays the API's MPP discovery document (`/openapi.json`) for agents that
 * start from the dashboard's origin.
 *
 * The paid routes — and the live Stripe price they charge — belong to the API,
 * so the backend generates the document. Its `servers` entry is absolute,
 * sending agents to the API from here too.
 *
 * Answers 404 on a self-hosted instance without contacting any API (billing is
 * cloud-only), and whenever the API does not offer agent payments, so nothing
 * is advertised that cannot be bought.
 *
 * @param isSelfHosted - Whether the dashboard runs in self-hosted mode.
 * @param fetchDocument - Injected for tests; defaults to the global `fetch`.
 * @see https://mpp.dev/advanced/discovery
 */
export const getMachinePaymentDiscoveryResponse = async (
  isSelfHosted: boolean,
  fetchDocument: FetchDocument = fetch
): Promise<Response> => {
  if (isSelfHosted) return notFound();

  try {
    const response = await fetchDocument(`${Backend_Root}/openapi.json`, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) return notFound();

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
};
