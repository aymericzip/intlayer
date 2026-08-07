import * as ANSIColors from '@intlayer/config/colors';
import { colorize } from '@intlayer/config/logger';

/**
 * Effective mode of the Intlayer locale-routing proxy, resolved from the
 * `routing.enableProxy` configuration option.
 *
 * - `'auto'` — the option was left unset. The proxy is registered, but it stays
 *   URL-driven while a development or preview server is serving the app: the
 *   stored locale (cookie / header) is not used as a redirect source, so a
 *   stale cookie cannot silently pull every navigation to another locale. In
 *   production the mode behaves exactly like `'forced'`.
 * - `'forced'` — the option was explicitly set to `true`. Full proxy behaviour
 *   in every environment, storage-driven redirects included.
 * - `'disabled'` — the option was explicitly set to `false`. The proxy is not
 *   registered at all (Vite) or becomes a pass-through (Next.js).
 */
export type ProxyMode = 'auto' | 'forced' | 'disabled';

/**
 * Resolves the effective {@link ProxyMode} from the `routing.enableProxy`
 * configuration value.
 *
 * `process.env.INTLAYER_ROUTING_ENABLE_PROXY` is injected at build time by
 * `getConfigEnvVars` and takes precedence, so bundlers can dead-code-eliminate
 * the branches guarded by the resolved mode. The variable is only emitted for
 * the two explicit states; its absence means `'auto'` and defers to the
 * configuration value read at runtime.
 *
 * @param enableProxy - The `routing.enableProxy` value; `undefined` means auto.
 * @returns The resolved proxy mode.
 *
 * @example
 * ```ts
 * resolveProxyMode(undefined); // 'auto'
 * resolveProxyMode(true);      // 'forced'
 * resolveProxyMode(false);     // 'disabled'
 * ```
 */
export const resolveProxyMode = (enableProxy?: boolean): ProxyMode => {
  if (process.env.INTLAYER_ROUTING_ENABLE_PROXY === 'false') return 'disabled';
  if (process.env.INTLAYER_ROUTING_ENABLE_PROXY === 'true') return 'forced';

  if (enableProxy === false) return 'disabled';
  if (enableProxy === true) return 'forced';

  return 'auto';
};

/**
 * Indicates whether the proxy may use the locale held in storage (cookie or
 * header) as a source when deciding which locale a request resolves to.
 *
 * Auto mode suppresses it on development and preview servers only. Every other
 * combination keeps the stored locale active, which notably preserves the
 * behaviour of `createIntlayerProxyHandler` when it is mounted manually in a
 * production Nitro server.
 *
 * Suppressing the read affects redirect *sources* only — the locale is still
 * persisted onto responses, the URL locale prefix still wins over everything,
 * and `Accept-Language` detection still applies as the fallback.
 *
 * @param proxyMode - The resolved proxy mode.
 * @param isDevServer - Whether a development or preview server is serving the app.
 * @returns `true` when the stored locale may drive locale resolution.
 *
 * @example
 * ```ts
 * isProxyStorageLocaleEnabled('auto', true);    // false — dev server, URL-driven only
 * isProxyStorageLocaleEnabled('auto', false);   // true  — production
 * isProxyStorageLocaleEnabled('forced', true);  // true  — explicitly opted in
 * ```
 */
export const isProxyStorageLocaleEnabled = (
  proxyMode: ProxyMode,
  isDevServer: boolean
): boolean => !(proxyMode === 'auto' && isDevServer);

/**
 * Builds the line announcing that a server has mounted the locale-routing
 * proxy.
 *
 * Shared by every integration (Vite plugin, Next.js middleware) so the reported
 * state cannot drift between them: when the stored locale is suppressed the
 * message says so, which would otherwise look like a broken proxy to anyone
 * testing locale switching with a cookie already set.
 *
 * Takes the suppression flag rather than the {@link ProxyMode} on purpose. Auto
 * mode only suppresses storage on a dev server, so a mode-based signature would
 * let a production caller — such as the Nitro production handler — announce a
 * suppression that is not actually in effect.
 *
 * @param isStorageLocaleSuppressed - Whether the stored locale is barred from
 *   driving redirects, i.e. the negation of {@link isProxyStorageLocaleEnabled}.
 * @returns An ANSI-coloured, ready-to-log message.
 *
 * @example
 * ```ts
 * formatProxyEnabledMessage(true);
 * // Intlayer proxy enabled - storage redirection disabled for dev purpose
 * formatProxyEnabledMessage(false);
 * // Intlayer proxy enabled
 * ```
 */
export const formatProxyEnabledMessage = (
  isStorageLocaleSuppressed: boolean
): string =>
  [
    `Intlayer proxy ${colorize('enabled', ANSIColors.GREEN)}`,
    isStorageLocaleSuppressed &&
      colorize(
        '- storage redirection disabled for dev purpose',
        ANSIColors.GREY
      ),
  ]
    .filter(Boolean)
    .join(' ');
