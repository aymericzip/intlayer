import { join } from 'node:path';
import { runOnce } from '@intlayer/chokidar/utils';
import * as ANSIColors from '@intlayer/config/colors';
import { colorize, getAppLogger } from '@intlayer/config/logger';
import { getConfiguration } from '@intlayer/config/node';
import type { PluginOption } from 'vite';
import { type CompatCallerConfig, intlayer } from 'vite-intlayer';

/**
 * Caller configurations for react-intl's two message APIs.
 *
 * react-intl encodes both the dictionary key and the field path in a single
 * dotted id string, so the `path-first-segment` namespace source extracts the
 * first segment as the dictionary key and `translationFunction: 'self'` records
 * the second segment as the consumed field:
 *
 *   `'home.title'` → dictionaryKey='home', field='title'
 *   `'greeting'`   → dictionaryKey='greeting', field='all' (single segment)
 *   dynamic id     → unresolvable → skipped (all fields kept)
 *
 * Both call sites are tracked:
 *   - `intl.formatMessage({ id })` — matched as a method on any object.
 *   - `<FormattedMessage id />`    — matched as a JSX element (import-gated).
 *
 * The JSX form is mandatory: the prune context is shared across all files, so
 * tracking only `formatMessage` would let a field referenced solely from
 * `<FormattedMessage>` be pruned away whenever the same dictionary is also read
 * through `formatMessage`.
 */
const REACT_INTL_COMPAT_CALLERS: CompatCallerConfig[] = [
  {
    callerName: 'formatMessage',
    importSources: ['react-intl', '@intlayer/react-intl'],
    matchAsMethod: true,
    namespace: { from: 'path-first-segment' },
    translationFunction: 'self',
  },
  // `<FormattedMessage id="home.title" />` — the dominant react-intl API. This
  // JSX form MUST be tracked alongside `formatMessage`: the prune context is
  // global across files, so a field referenced only from JSX would otherwise be
  // pruned away when the same dictionary is also read via `formatMessage`.
  {
    callerName: 'FormattedMessage',
    importSources: ['react-intl', '@intlayer/react-intl'],
    jsxIdAttribute: 'id',
    namespace: { from: 'path-first-segment' },
    translationFunction: 'self',
  },
];

/**
 * A Vite plugin for react-intl compat that wraps vite-intlayer
 * and injects a resolve alias mapping `react-intl` to
 * `@intlayer/react-intl`.
 *
 * @example
 * ```ts
 * // vite.config.ts
 * import reactIntlVitePlugin from '@intlayer/react-intl/plugin';
 *
 * export default defineConfig({
 *   plugins: [reactIntlVitePlugin()],
 * });
 * ```
 */
export const reactIntlVitePlugin = (
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
      ...REACT_INTL_COMPAT_CALLERS,
    ],
  });

  const compatPlugin: PluginOption = {
    name: 'vite-react-intl-compat-plugin',
    config: () => ({
      resolve: {
        alias: {
          'react-intl': '@intlayer/react-intl',
        },
      },
    }),
  };

  return [
    ...(Array.isArray(basePlugins) ? basePlugins : [basePlugins]),
    compatPlugin,
  ];
};

export default reactIntlVitePlugin;
