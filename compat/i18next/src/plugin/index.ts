import { join } from 'node:path';
import { runOnce } from '@intlayer/chokidar/utils';
import * as ANSIColors from '@intlayer/config/colors';
import { colorize, getAppLogger } from '@intlayer/config/logger';
import { getConfiguration } from '@intlayer/config/node';
import type { PluginOption } from 'vite';
import { type CompatCallerConfig, intlayer } from 'vite-intlayer';

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

/**
 * Caller configurations for i18next's `getFixedT` method.
 *
 * Tells the intlayer field-usage analyser how to extract the dictionary key
 * (namespace) and optional key prefix from `i18n.getFixedT(lng, ns, prefix)`
 * call sites, enabling accurate dictionary pruning for projects using
 * `@intlayer/i18next`.
 */
const I18NEXT_COMPAT_CALLERS: CompatCallerConfig[] = [
  {
    callerName: 'getFixedT',
    importSources: ['i18next', '@intlayer/i18next'],
    matchAsMethod: true,
    namespace: { from: 'argument', index: 1 },
    keyPrefix: { from: 'argument', index: 2 },
    translationFunction: 'return-value',
  },
];

export const i18nextVitePlugin = (
  options?: Parameters<typeof intlayer>[0]
): PluginOption[] => {
  const intlayerConfig = getConfiguration();
  const appLogger = getAppLogger(intlayerConfig);

  runOnce(
    join(
      intlayerConfig.system.baseDir,
      '.intlayer',
      'cache',
      'intlayer-issues-invitation.lock'
    ),
    () => {
      appLogger([
        colorize(
          'Please report any issues you met on GitHub:',
          ANSIColors.GREY
        ),
        colorize(
          'https://github.com/aymericzip/intlayer/issues',
          ANSIColors.GREY_LIGHT
        ),
      ]);
    },
    {
      cacheTimeoutMs: 1000 * 60 * 60, // 1 hour
    }
  );

  const basePlugins = intlayer({
    ...options,
    compatCallers: [
      ...(options?.compatCallers ?? []),
      ...I18NEXT_COMPAT_CALLERS,
    ],
  });

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
