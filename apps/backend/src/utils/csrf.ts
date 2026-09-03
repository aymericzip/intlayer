import { isTrustedOrigin, toOrigin } from '@utils/trustedOrigins';
import type { FastifyRequest } from 'fastify';

/**
 * Cookie-name fragment identifying a better-auth session cookie.
 *
 * The effective name varies with configuration — `cookiePrefix` prepends
 * `intlayer.`, secure contexts prepend `__Secure-`, and the `multiSession`
 * plugin appends `_multi-<id>` — but every variant contains this fragment.
 */
const SESSION_COOKIE_FRAGMENT = 'session_token';

/** Methods that must not change server state, per RFC 9110 §9.2.1. */
const SAFE_HTTP_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);

/**
 * Why a request was allowed through, or the origin that got it rejected.
 *
 * Discriminated on a string rather than a boolean because the workspace
 * compiles with `strictNullChecks` off, under which TypeScript does not narrow
 * boolean-literal discriminants.
 */
export type CsrfVerdict =
  | {
      outcome: 'allowed';
      reason:
        | 'safe-method'
        | 'bearer-authenticated'
        | 'no-session-cookie'
        | 'no-browser-origin'
        | 'trusted-origin';
    }
  | { outcome: 'rejected'; origin: string };

/** Collapses a possibly-repeated header to its first value. */
const firstHeaderValue = (
  value: string | string[] | undefined
): string | undefined => (Array.isArray(value) ? value[0] : value);

/**
 * Tells whether a raw `Cookie` header carries a session cookie.
 *
 * Reads the raw header rather than `request.cookies` so the check does not
 * depend on `@fastify/cookie` having parsed the request first, keeping this
 * hook safe to register before any other plugin.
 *
 * @param cookieHeader - The raw `Cookie` header value.
 */
export const hasSessionCookie = (cookieHeader?: string): boolean =>
  (cookieHeader ?? '')
    .split(';')
    .some((cookie) => cookie.split('=')[0]?.includes(SESSION_COOKIE_FRAGMENT));

/**
 * Resolves the origin a browser attributes to the request.
 *
 * `Origin` is authoritative and is sent by every browser on cross-origin
 * requests and on same-origin unsafe methods. `Referer` is only a fallback for
 * the rare browser that omits `Origin`, and is reduced to its origin so its
 * path can never influence the comparison.
 *
 * @param request - The incoming Fastify request.
 * @returns The requesting origin, or `null` when the client sent neither
 * header — which no browser does for an unsafe method.
 */
export const getBrowserOrigin = (request: FastifyRequest): string | null => {
  const originHeader = firstHeaderValue(request.headers.origin);
  if (originHeader) return originHeader;

  const refererHeader = firstHeaderValue(request.headers.referer);
  if (refererHeader) return toOrigin(refererHeader);

  return null;
};

/**
 * Decides whether a request may proceed.
 *
 * A request with neither `Origin` nor `Referer` is allowed: browsers always
 * send `Origin` on unsafe methods, so its absence marks a non-browser caller
 * (server-to-server calls that forward a session cookie, such as dashboard
 * SSR, land here) which cannot be driven by a hostile page.
 *
 * @param request - The incoming Fastify request.
 * @returns The verdict, carrying the reason so the caller can log it.
 */
export const verifyCsrf = (request: FastifyRequest): CsrfVerdict => {
  if (SAFE_HTTP_METHODS.has(request.method))
    return { outcome: 'allowed', reason: 'safe-method' };

  if (firstHeaderValue(request.headers.authorization))
    return { outcome: 'allowed', reason: 'bearer-authenticated' };

  if (!hasSessionCookie(firstHeaderValue(request.headers.cookie)))
    return { outcome: 'allowed', reason: 'no-session-cookie' };

  const origin = getBrowserOrigin(request);
  if (!origin) return { outcome: 'allowed', reason: 'no-browser-origin' };

  if (isTrustedOrigin(origin))
    return { outcome: 'allowed', reason: 'trusted-origin' };

  return { outcome: 'rejected', origin };
};
