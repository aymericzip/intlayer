import { join } from 'node:path';
import { runOnce } from '@intlayer/chokidar/utils';
import * as ANSIColors from '@intlayer/config/colors';
import { colorize, getAppLogger } from '@intlayer/config/logger';
import { getConfiguration } from '@intlayer/config/node';
import type { PluginOption } from 'vite';
import { type CompatCallerConfig, intlayer } from 'vite-intlayer';

/**
 * Caller configurations for use-intl's translation entry points.
 *
 * Tells the intlayer field-usage analyser how to extract the dictionary key
 * (namespace) and consumed fields from `useTranslations` / `createTranslator`
 * call sites, enabling accurate dictionary pruning for projects using
 * `@intlayer/use-intl`.
 */
const USE_INTL_COMPAT_CALLERS: CompatCallerConfig[] = [
  {
    callerName: 'useTranslations',
    importSources: ['use-intl', 'use-intl/react', '@intlayer/use-intl'],
    namespace: { from: 'argument', index: 0 },
    translationFunction: 'return-value',
  },
  {
    callerName: 'createTranslator',
    importSources: ['use-intl', 'use-intl/core', '@intlayer/use-intl'],
    namespace: { from: 'option', argumentIndex: 0, property: 'namespace' },
    translationFunction: 'return-value',
  },
];

/**
 * A Vite plugin for use-intl compat that wraps vite-intlayer and configures
 * resolve aliases so `use-intl` imports are served by `@intlayer/use-intl`.
 *
 * @example
 * ```ts
 * // vite.config.ts
 * import useIntlVitePlugin from '@intlayer/use-intl/plugin';
 *
 * export default defineConfig({
 *   plugins: [useIntlVitePlugin()],
 * });
 * ```
 */
export const useIntlVitePlugin = (
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
      ...USE_INTL_COMPAT_CALLERS,
    ],
  });

  const compatPlugin: PluginOption = {
    name: 'vite-use-intl-compat-plugin',
    config: () => ({
      resolve: {
        alias: {
          'use-intl': '@intlayer/use-intl',
        },
      },
    }),
  };

  return [
    ...(Array.isArray(basePlugins) ? basePlugins : [basePlugins]),
    compatPlugin,
  ];
};

export default useIntlVitePlugin;
