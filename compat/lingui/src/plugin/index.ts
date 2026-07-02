import { join } from 'node:path';
import { runOnce } from '@intlayer/chokidar/utils';
import { LINGUI_CALLERS } from '@intlayer/config/callers';
import * as ANSIColors from '@intlayer/config/colors';
import { colorize, getAppLogger } from '@intlayer/config/logger';
import { getConfiguration } from '@intlayer/config/node';
import type { PluginOption } from 'vite';
import { intlayer } from 'vite-intlayer';

/**
 * A Vite plugin for the lingui compat adapter.
 *
 * Wraps `vite-intlayer` and adds resolve aliases so that both
 * `@lingui/core` **and** `@lingui/react` are redirected to
 * `@intlayer/lingui` at bundle time.
 *
 * @example
 * ```ts
 * // vite.config.ts
 * import { lingui } from '@intlayer/lingui/plugin';
 *
 * export default defineConfig({
 *   plugins: [lingui()],
 * });
 * ```
 */
export const lingui = (
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
    compatCallers: [...(options?.compatCallers ?? []), ...LINGUI_CALLERS],
  });

  const compatPlugin: PluginOption = {
    name: 'vite-lingui-compat-plugin',
    config: () => ({
      resolve: {
        alias: {
          '@lingui/core': '@intlayer/lingui',
          '@lingui/react': '@intlayer/lingui',
        },
      },
    }),
  };

  return [
    ...(Array.isArray(basePlugins) ? basePlugins : [basePlugins]),
    compatPlugin,
  ];
};

/**
 * Backwards-compatible alias for {@link lingui}, matching the naming used by the
 * other compat adapters' Vite plugins (e.g. `i18nextVitePlugin`).
 */
export const linguiVitePlugin = lingui;

export default lingui;
