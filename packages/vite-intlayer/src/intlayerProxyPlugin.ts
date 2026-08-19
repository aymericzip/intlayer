import type { IncomingMessage } from 'node:http';
import { fileURLToPath } from 'node:url';
import { getAppLogger } from '@intlayer/config/logger';
import {
  type GetConfigurationOptions,
  getConfiguration,
} from '@intlayer/config/node';
import {
  formatProxyEnabledMessage,
  isProxyStorageLocaleEnabled,
  resolveProxyMode,
} from '@intlayer/core/localization';
/* @ts-ignore - Vite types error */
import type { Plugin } from 'vite';
import { createPrimaryInstanceGuard } from './dedupePlugin';
import {
  createProxyHandler,
  type NodeMiddleware,
} from './intlayerProxyHandler';

const PROXY_PLUGIN_NAME = 'vite-intlayer-middleware-plugin';

/**
 * Name of the Vite plugin `nitro/vite` registers in preview mode. It mounts the
 * built Nitro server — which already carries the Intlayer proxy as a Nitro
 * middleware — inside the Vite preview server.
 */
const NITRO_PREVIEW_PLUGIN_NAME = 'nitro:preview';

export type IntlayerProxyPluginOptions = {
  /**
   * A function that allows you to ignore specific requests from the intlayer proxy.
   *
   * @example
   * ```ts
   * export default defineConfig({
   *   plugins: [ intlayerProxy({ ignore: (req) => req.url?.startsWith('/api') }) ],
   * });
   * ```
   *
   * @param req - The incoming request.
   * @returns A boolean value indicating whether to ignore the request.
   */
  ignore?: (req: IncomingMessage) => boolean | undefined;
  /**
   * Optional Intlayer configuration overrides forwarded to `getConfiguration`.
   *
   * @example
   * ```ts
   * export default defineConfig({
   *   plugins: [ intlayerProxy({ configOptions: { override: { ... } } }) ],
   * });
   * ```
   */
  configOptions?: GetConfigurationOptions;
  /**
   * Whether a development or preview server is serving the app.
   *
   * Set internally by the plugin from `configureServer` /
   * `configurePreviewServer`. It only matters in the proxy's auto mode, where
   * a dev server keeps locale routing URL-driven by ignoring the stored locale
   * as a redirect source.
   *
   * Defaults to `false` so that mounting `createIntlayerProxyHandler()`
   * manually — the documented production Nitro setup — keeps full behaviour.
   *
   * @default false
   */
  isDevServer?: boolean;
};

/**
 * Creates a standalone, framework-agnostic locale-routing middleware.
 *
 * It loads the Intlayer configuration and hands it to the runtime handler in
 * `intlayerProxyHandler`, so it can be used in every environment:
 *
 * - **Dev**: wired up automatically by `intlayerProxy` via `configureServer`
 * - **Preview**: wired up automatically by `intlayerProxy` via `configurePreviewServer`
 * - **Production (Nitro / TanStack Start)**: create `server/middleware/intlayerProxy.ts`:
 *
 * @example
 * ```ts
 * // server/middleware/intlayerProxy.ts
 * import { fromNodeMiddleware } from 'h3';
 * import { createIntlayerProxyHandler } from 'vite-intlayer';
 *
 * export default fromNodeMiddleware(createIntlayerProxyHandler());
 * ```
 *
 * @param options - Plugin-specific options, such as path ignoring and Intlayer configuration overrides.
 * @returns A Connect-compatible `(req, res, next) => void` middleware.
 */
export const createIntlayerProxyHandler = (
  options?: IntlayerProxyPluginOptions
): NodeMiddleware =>
  createProxyHandler({
    configuration: getConfiguration(options?.configOptions),
    ignore: options?.ignore,
    isDevServer: options?.isDevServer ?? false,
  });

/**
 * Vite plugin that provides locale-based routing middleware for **all environments**:
 * development, preview, and production SSR (Nitro / TanStack Start).
 *
 * - **Dev** (`vite dev`): registered via `configureServer`.
 * - **Preview** (`vite preview`): registered via `configurePreviewServer`.
 * - **Production Nitro** (`vite build`): automatically injected via the `.nitro` module
 *   property that `nitro/vite` reads and pushes into `nitroConfig.modules`. The module
 *   registers `intlayerNitroHandler` as a Nitro server middleware — no extra user config
 *   needed.
 *
 * If you need custom config options or an `ignore` predicate in production, bypass
 * auto-injection and create a server middleware file manually:
 *
 * ```ts
 * // server/middleware/intlayerProxy.ts
 * import { fromNodeMiddleware } from 'h3';
 * import { createIntlayerProxyHandler } from 'vite-intlayer';
 *
 * export default fromNodeMiddleware(
 *   createIntlayerProxyHandler({
 *     ignore: (req) => req.url?.startsWith('/api'),
 *     configOptions: myConfig,
 *   })
 * );
 * ```
 *
 * @param options - Plugin-specific options, like ignoring certain paths and Intlayer configuration overrides.
 * @returns A Vite plugin.
 *
 * @example
 * ```ts
 * import { intlayerProxy } from 'vite-intlayer';
 *
 * export default defineConfig({
 *   plugins: [intlayerProxy()],
 * });
 * ```
 *
 * @deprecated Since Intlayer v9, `intlayerProxy()` is bundled directly into the `intlayer()` plugin and enabled by default through the `routing.enableProxy` option (unset by default, which selects auto mode). Registering it separately as shown below is now optional.
 */
export const intlayerProxy = (options?: IntlayerProxyPluginOptions): Plugin => {
  // Dev and preview servers run the same handler; both are "dev servers" as far
  // as auto mode is concerned, so a single instance covers both hooks.
  const handler = createIntlayerProxyHandler({ ...options, isDevServer: true });
  const intlayerConfig = getConfiguration(options?.configOptions);
  const logger = getAppLogger(intlayerConfig);

  // Both hooks below serve a dev or preview server, hence the hard-coded true.
  const isStorageLocaleSuppressed = !isProxyStorageLocaleEnabled(
    resolveProxyMode(intlayerConfig.routing.enableProxy),
    true
  );

  /**
   * Logs that the proxy is serving requests, spelling out when auto mode has
   * suppressed the stored locale so the reported state matches the behaviour.
   */
  const logProxyEnabled = () =>
    logger(formatProxyEnabledMessage(isStorageLocaleSuppressed), {
      level: 'info',
    });

  // Ensures the proxy registers its middleware only once, even when it is
  // registered both via `intlayer()` (which now bundles it) and a manual
  // `intlayerProxy()` call.
  const guard = createPrimaryInstanceGuard(PROXY_PLUGIN_NAME);

  // Set during `configResolved`: `nitro/vite` serves the *built* Nitro server
  // from inside the preview server, and that build already carries the proxy as
  // a Nitro middleware (see `nitroModule` below).
  let isNitroServingPreview = false;

  /**
   * Nitro module injected automatically by `nitro/vite`.
   *
   * When a Vite plugin carries a `.nitro` property, `nitro/vite` pushes it into
   * `nitroConfig.modules` during the build phase. The module's `setup` hook adds
   * our locale-routing handler to Nitro's server pipeline, making locale detection
   * work in production SSR builds (TanStack Start, Nuxt, etc.) without any extra
   * user configuration.
   *
   * @see https://github.com/nitrojs/nitro (nitro/vite source, line ~402)
   */
  const nitroModule = {
    name: 'intlayer-proxy',
    setup(nitro: {
      options: {
        dev: boolean;
        handlers: {
          route: string;
          handler: string;
          middleware: boolean;
        }[];
      };
    }) {
      // In dev mode, locale routing is already handled by configureServer (Vite dev server).
      // The Nitro dev server uses h3 v2's Web Fetch API event model which is incompatible
      // with fromNodeMiddleware (h3 v1) and would cause double-execution anyway.
      // Only inject for production builds where Nitro is the actual HTTP server.
      if (nitro.options.dev) return;

      const handlerPath = fileURLToPath(
        new URL('./intlayerNitroHandler.mjs', import.meta.url)
      );

      // Skip if an identical handler was already registered by another instance
      // (e.g. both `intlayer()` and a manual `intlayerProxy()`).
      const alreadyRegistered = nitro.options.handlers.some(
        (existingHandler) => existingHandler.handler === handlerPath
      );
      if (alreadyRegistered) return;

      nitro.options.handlers.push({
        route: '/**',
        handler: handlerPath,
        middleware: true,
      });
    },
  };

  const plugin = {
    name: PROXY_PLUGIN_NAME,
    // Decide whether this is the primary instance before registering middleware.
    configResolved: (config: { plugins: readonly { name: string }[] }) => {
      guard.resolve(config);
      isNitroServingPreview = config.plugins.some(
        (registeredPlugin) =>
          registeredPlugin.name === NITRO_PREVIEW_PLUGIN_NAME
      );
    },
    // Injected into nitroConfig.modules by the `nitro/vite` plugin so the
    // locale-routing middleware is registered in the production Nitro server.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    nitro: nitroModule as any,
    // Vite dev server
    configureServer: (server) => {
      if (!guard.isPrimary) return;
      logProxyEnabled();
      server.middlewares.use(handler);
    },
    // Vite preview server
    configurePreviewServer: (server) => {
      if (!guard.isPrimary) return;
      // With Nitro, the preview server forwards every request to the built
      // Nitro server, whose pipeline already starts with this proxy. Adding a
      // second layer here would run locale resolution twice on the same
      // request: the first pass rewrites `req.url` (and the locale request
      // header), the second pass reads that rewritten URL as if it came from
      // the browser and can redirect it back — the redirect ping-pong that
      // shows up as "max redirects reached" while prerendering.
      if (isNitroServingPreview) return;
      logProxyEnabled();
      server.middlewares.use(handler);
    },
  } as Plugin;

  // Register the plugin object so the dedupe guard can identify the primary
  // instance by reference during `configResolved`.
  guard.setPlugin(plugin);

  return plugin;
};

/**
 * @deprecated Rename to intlayerProxy instead
 *
 * A Vite plugin that integrates a logic similar to the Next.js intlayer middleware.
 *
 * ```ts
 * // Example usage of the plugin in a Vite configuration
 * export default defineConfig({
 *   plugins: [ intlayerMiddleware() ],
 * });
 * ```
 */
export const intlayerMiddleware = intlayerProxy;

/**
 * @deprecated Rename to intlayerProxy instead
 *
 * A Vite plugin that integrates a logic similar to the Next.js intlayer middleware.
 *
 * ```ts
 * // Example usage of the plugin in a Vite configuration
 * export default defineConfig({
 *   plugins: [ intlayerMiddleware() ],
 * });
 * ```
 */
export const intLayerMiddlewarePlugin = intlayerProxy;
