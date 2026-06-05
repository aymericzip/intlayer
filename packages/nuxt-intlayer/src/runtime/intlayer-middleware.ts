import { fromNodeMiddleware } from 'h3';
import { createIntlayerProxyHandler } from 'vite-intlayer';

/**
 * Nitro server middleware that handles locale detection, redirects, and rewrites
 * for Nuxt applications.
 *
 * Registered automatically by `nuxt-intlayer` via `addServerHandler` so it runs
 * in both development (Nitro dev server) and production.
 *
 * If you need custom Intlayer config or an `ignore` predicate, bypass auto-registration
 * and add your own handler in `server/middleware/intlayerProxy.ts`:
 *
 * @example
 * ```ts
 * import { fromNodeMiddleware } from 'h3';
 * import { createIntlayerProxyHandler } from 'vite-intlayer';
 *
 * export default fromNodeMiddleware(
 *   createIntlayerProxyHandler(myConfig, { ignore: (req) => req.url?.startsWith('/api') })
 * );
 * ```
 */
export default fromNodeMiddleware(createIntlayerProxyHandler());
