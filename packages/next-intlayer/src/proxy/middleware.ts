import { intlayerProxy } from './intlayerProxy';
import { multipleProxies } from './multipleProxies';

/**
 * Reexport for nextjs <=15
 */

/**
 * Middleware that handles the internationalization layer
 *
 * Usage:
 *
 * ```ts
 * // ./src/middleware.ts
 *
 * export { intlayerMiddleware as middleware } from '@intlayer/next/middleware';
 *
 * // applies this middleware only to files in the app directory
 * export const config = {
 *   matcher: '/((?!api|static|.*\\..*|_next).*)',
 * };
 * ```
 *
 * Main middleware function for handling internationalization.
 *
 * @param request - The incoming Next.js request object.
 * @param event - The Next.js fetch event (optional).
 * @param response - The Next.js response object (optional).
 * @returns - The response to be returned to the client.
 */
export const intlayerMiddleware = intlayerProxy;

export const multipleMiddlewares = multipleProxies;
