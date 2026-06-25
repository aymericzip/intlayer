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
 * After `@lingui/babel-plugin-lingui-macro` / `@lingui/swc-plugin` compiles
 * macros (`` t`Hello ${name}` `` → `i18n._(id, values)`) the intlayer field
 * usage analyser sees these method calls and records which top-level fields of
 * the `messages` dictionary are consumed, enabling accurate pruning.
 *
 * Two call forms are tracked:
 *   - `i18n._('home.title', values)` — string id
 *   - `i18n._({ id: 'home.title', message: '...' }, values)` — descriptor
 *   - `i18n.t('home.title', values)` — alias for `_`
 *
 * Because lingui projects may also use hashed IDs (generated from the default
 * message string) that cannot be statically mapped to dictionary keys, a
 * separate `'all'`-mode caller is not needed here: when the first argument is
 * not a static string or descriptor, the `'self'` handler falls back to `'all'`
 * automatically.
 */
const LINGUI_COMPAT_CALLERS: CompatCallerConfig[] = [
  {
    callerName: '_',
    importSources: ['@lingui/core', '@intlayer/lingui'],
    matchAsMethod: true,
    namespace: { from: 'fixed', value: 'messages' },
    translationFunction: 'self',
  },
  {
    callerName: 't',
    importSources: ['@lingui/core', '@intlayer/lingui'],
    matchAsMethod: true,
    namespace: { from: 'fixed', value: 'messages' },
    translationFunction: 'self',
  },
];

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
const lingui = (options?: Parameters<typeof intlayer>[0]): PluginOption[] => {
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
