/**
 * @intlayer/config/built — browser build
 *
 * In browser bundles this module is selected automatically via the `browser`
 * export condition in package.json (supported by Vite, webpack, Rollup, etc.).
 *
 * Configuration is resolved at *access time* (lazy) from `window.INTLAYER_CONFIG`
 * so that it works both when:
 *
 *  - A build plugin (vite-intlayer / withIntlayer) injects the value via
 *    bundler `define` (static replacement at build time), OR
 *  - The application calls `installIntlayer(config)` at runtime before any
 *    config field is first accessed.
 */
import type { IntlayerConfig } from '@intlayer/types/config';
// This import brings in the `declare global { interface Window { INTLAYER_CONFIG } }` augmentation
import type {} from './configFile/buildBrowserConfiguration';

/**
 * Proxy that reads each top-level key from `window.INTLAYER_CONFIG` lazily.
 * This avoids the module-evaluation timing issue: the proxy is safe to import
 * at the top of any file because the actual `window.INTLAYER_CONFIG` value is
 * only read when a property is first accessed.
 */
const configuration = new Proxy({} as IntlayerConfig, {
  get(_target, prop: string) {
    const config =
      typeof window !== 'undefined' ? window.INTLAYER_CONFIG : undefined;
    return (config as Record<string, unknown> | undefined)?.[prop];
  },
  has(_target, prop: string) {
    const config =
      typeof window !== 'undefined' ? window.INTLAYER_CONFIG : undefined;
    return config != null && prop in config;
  },
});

export const internationalization = configuration.internationalization;
export const dictionary = configuration.dictionary;
export const routing = configuration.routing;
export const content = configuration.content;
export const system = configuration.system;
export const editor = configuration.editor;
export const log = configuration.log;
export const ai = configuration.ai;
export const build = configuration.build;
export const compiler = configuration.compiler;
export const schemas = configuration.schemas;
export const plugins = configuration.plugins;

export default configuration;
