import type { PluginOption } from 'vite';
import { intlayer } from 'vite-intlayer';

/**
 * A Vite plugin for the i18next compat adapter that wraps `vite-intlayer`
 * and registers a resolve alias mapping `i18next` to `@intlayer/i18next`.
 *
 * This lets an existing i18next codebase migrate to intlayer without
 * rewriting any `import ... from 'i18next'` statements — they are
 * transparently redirected to the compat adapter at build time.
 *
 * @example
 * ```ts
 * // vite.config.ts
 * import i18nextVitePlugin from '@intlayer/i18next/plugin';
 *
 * export default defineConfig({
 *   plugins: [i18nextVitePlugin()],
 * });
 * ```
 */
export const i18nextVitePlugin = (
  options?: Parameters<typeof intlayer>[0]
): PluginOption[] => {
  const basePlugins = intlayer(options);

  const compatPlugin: PluginOption = {
    name: 'vite-i18next-compat-plugin',
    config: () => {
      return {
        resolve: {
          alias: {
            i18next: '@intlayer/i18next',
          },
        },
      };
    },
  };

  return [
    ...(Array.isArray(basePlugins) ? basePlugins : [basePlugins]),
    compatPlugin,
  ];
};

export default i18nextVitePlugin;
