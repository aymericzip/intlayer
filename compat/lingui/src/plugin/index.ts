import { join } from 'node:path';
import { runOnce } from '@intlayer/chokidar/utils';
import * as ANSIColors from '@intlayer/config/colors';
import { colorize, getAppLogger } from '@intlayer/config/logger';
import { getConfiguration } from '@intlayer/config/node';
import type { PluginOption } from 'vite';
import { type CompatCallerConfig, intlayer } from 'vite-intlayer';

/**
 * Caller configurations for lingui.
 *
 * Lingui's `i18n._(id)` / `i18n.t` and `useLingui()`'s `_()` all resolve
 * translations at runtime through the intlayer `messages` dictionary. Since the
 * mapping is 1:1 (one catalog → one `messages` dict) there is no namespace
 * splitting needed at the analyser level, so the caller list is empty for now.
 *
 * Future: once `namespace: { from: 'self' }` is supported in the babel/swc
 * analyser, we can add callers for `useLingui()._(id)`.
 */
const LINGUI_COMPAT_CALLERS: CompatCallerConfig[] = [];

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
 * import { linguiVitePlugin } from '@intlayer/lingui/plugin';
 *
 * export default defineConfig({
 *   plugins: [linguiVitePlugin()],
 * });
 * ```
 */
export const linguiVitePlugin = (
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
      ...LINGUI_COMPAT_CALLERS,
    ],
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

export default linguiVitePlugin;
