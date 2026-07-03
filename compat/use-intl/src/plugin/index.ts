import { join } from 'node:path';
import { USE_INTL_CALLERS } from '@intlayer/config/callers';
import * as ANSIColors from '@intlayer/config/colors';
import { colorize, getAppLogger } from '@intlayer/config/logger';
import { getConfiguration } from '@intlayer/config/node';
import { runOnce } from '@intlayer/engine/utils';
import type { PluginOption } from 'vite';
import { intlayer } from 'vite-intlayer';

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
    compatCallers: [...(options?.compatCallers ?? []), ...USE_INTL_CALLERS],
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
