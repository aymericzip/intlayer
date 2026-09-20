import type { IncomingMessage } from 'node:http';
import { fileURLToPath } from 'node:url';
import { getAppLogger } from '@intlayer/config/logger';
import {
  type GetConfigurationOptions,
  getConfiguration,
} from '@intlayer/config/node';
import { normalizePath } from '@intlayer/config/utils';
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

/**
 * Server config of a Vite dev server, narrowed to the fields inspected below.
 */
type DevServerLike = {
  config: { server: { middlewareMode?: unknown; hmr?: unknown; ws?: unknown } };
};

/**
 * Detects a throwaway Vite server that never receives a browser request.
 *
 * Astro's `sync` step (run by `astro build`) boots a middleware-mode server
 * with HMR and its WebSocket server disabled, only to load the content config,
 * and tears it down right after. Announcing the proxy there reads as if the
 * static build were locale-routed, so the banner is skipped for such servers.
 */
const isThrowawayServer = ({ config: { server } }: DevServerLike): boolean =>
  Boolean(server.middlewareMode) && server.hmr === false && server.ws === false;

/**
 * Restricts a proxy middleware to its redirects: a request the proxy lets
 * through continues with the URL the browser sent, any internal rewrite
 * undone, for a downstream server that runs the full proxy itself.
 */
export const createRedirectOnlyMiddleware =
  (handler: NodeMiddleware): NodeMiddleware =>
  (req, res, next) => {
    const originalUrl = req.url;

    handler(req, res, () => {
      req.url = originalUrl;
      next();
    });
  };

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
   * Whether a development server is serving the app.
   *
   * Set internally by the plugin from `configureServer`. It only matters in
   * the proxy's auto mode, where a dev server keeps locale routing URL-driven
   * by ignoring the stored locale as a redirect source.
   *
   * A preview server (`vite preview`) serves the production build, so it is
   * *not* a dev server: the stored locale drives redirects there, as it does
   * on the deployed app.
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
/**
 * Absolute path of the built Nitro middleware, relative to this module.
 *
 * Nitro inlines the path as an import specifier in its virtual routing module,
 * so Windows backslashes must become forward slashes or the import breaks.
 *
 * @param moduleUrl - `import.meta.url` of the calling module
 * @param toPath - `file:` URL to path converter (overridable for tests)
 */
export const resolveNitroHandlerPath = (
  moduleUrl: string,
  toPath: (url: URL) => string = fileURLToPath
): string =>
  normalizePath(toPath(new URL('./intlayerNitroHandler.mjs', moduleUrl)));

export const intlayerProxy = (options?: IntlayerProxyPluginOptions): Plugin => {
  const intlayerConfig = getConfiguration(options?.configOptions);
  const logger = getAppLogger(intlayerConfig);
  const proxyMode = resolveProxyMode(intlayerConfig.routing.enableProxy);

  // The dev server is the only place auto mode suppresses the stored locale.
  // The preview server serves the production build (`vite build` output), so
  // it runs the production handler: a locale cookie must redirect there
  // exactly as it will once deployed, otherwise `vite preview` cannot be used
  // to check that behaviour. Built on demand: a build mounts neither.
  const createHandler = (isDevServer: boolean): NodeMiddleware =>
    createProxyHandler({
      configuration: intlayerConfig,
      ignore: options?.ignore,
      isDevServer,
    });

  /**
   * Logs that the proxy is serving requests, spelling out when auto mode has
   * suppressed the stored locale so the reported state matches the behaviour.
   */
  const logProxyEnabled = (isDevServer: boolean) =>
    logger(
      formatProxyEnabledMessage(
        !isProxyStorageLocaleEnabled(proxyMode, isDevServer)
      ),
      { level: 'info' }
    );

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

      const handlerPath = resolveNitroHandlerPath(import.meta.url);

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

  // `configResolved` runs once per Vite build the plugin instance takes part
  // in (Astro runs a server and a client build from the same instances).
  let hasAnnouncedBuild = false;

  /**
   * Announces the proxy at build time. A build never reads the stored locale:
   * it only prerenders pages served to every visitor, and a static output has
   * no server to redirect from until `preview` or a host mounts the handler.
   */
  const announceBuild = () => {
    if (hasAnnouncedBuild) return;
    hasAnnouncedBuild = true;
    logger(formatProxyEnabledMessage(true, 'build'), { level: 'info' });
  };

  const plugin = {
    name: PROXY_PLUGIN_NAME,
    // The preview layer must be mounted ahead of the `nitro:preview`
    // middleware, which answers every request itself, whatever the order of
    // the plugins in the user's Vite config.
    enforce: 'pre',
    // Decide whether this is the primary instance before registering middleware.
    configResolved: (config: {
      command: 'build' | 'serve';
      plugins: readonly { name: string }[];
    }) => {
      guard.resolve(config);
      isNitroServingPreview = config.plugins.some(
        (registeredPlugin) =>
          registeredPlugin.name === NITRO_PREVIEW_PLUGIN_NAME
      );
      if (guard.isPrimary && config.command === 'build') announceBuild();
    },
    // Injected into nitroConfig.modules by the `nitro/vite` plugin so the
    // locale-routing middleware is registered in the production Nitro server.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    nitro: nitroModule as any,
    // Vite dev server
    configureServer: (server) => {
      if (!guard.isPrimary) return;
      if (!isThrowawayServer(server)) logProxyEnabled(true);
      server.middlewares.use(createHandler(true));
    },
    // Vite preview server
    configurePreviewServer: (server) => {
      if (!guard.isPrimary) return;

      const previewHandler = createHandler(false);

      if (!isNitroServingPreview) {
        logProxyEnabled(false);
        server.middlewares.use(previewHandler);
        return;
      }

      // The built Nitro server announces the proxy itself when it loads, so
      // nothing is logged here.
      //
      // With Nitro, the preview server forwards every request to the built
      // Nitro server, whose pipeline already starts with this proxy — but
      // Nitro's preview serves the prerendered pages straight from disk,
      // ahead of that pipeline, so a stored locale would be ignored on exactly
      // the pages a visitor lands on. Redirects are therefore decided here,
      // and everything else reaches Nitro with its URL untouched: letting a
      // rewrite through would make the Nitro pass read `/en/about` as if the
      // browser had sent it and redirect it back to `/about` — the ping-pong
      // that shows up as "max redirects reached" while prerendering.
      server.middlewares.use(createRedirectOnlyMiddleware(previewHandler));
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
