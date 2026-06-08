import type _createMiddleware from 'next-intl/middleware';
import { intlayerMiddleware } from 'next-intlayer/middleware';

/**
 * Drop-in replacement for next-intl's `createMiddleware`.
 *
 * Returns Intlayer's proxy/middleware, which handles locale detection and
 * routing from the Intlayer configuration. The `routing` argument is accepted
 * for API compatibility but ignored — locales come from `intlayer.config`.
 *
 * @example
 * ```ts
 * // proxy.ts (or middleware.ts on Next <= 15)
 * import createMiddleware from 'next-intl/middleware';
 * export default createMiddleware(routing);
 * export const config = { matcher: ['/((?!api|_next|.*\\..*).*)'] };
 * ```
 */
const _createMiddlewareImpl = (_routing?: unknown) => intlayerMiddleware;

export const createMiddleware =
  _createMiddlewareImpl as unknown as typeof _createMiddleware;

export default createMiddleware;
