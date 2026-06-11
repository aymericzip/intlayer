import { join } from 'node:path';
import { runOnce } from '@intlayer/chokidar/utils';
import * as ANSIColors from '@intlayer/config/colors';
import { colorize, getAppLogger } from '@intlayer/config/logger';
import { getConfiguration } from '@intlayer/config/node';
import type { PluginOption } from 'vite';
import { type CompatCallerConfig, intlayer } from 'vite-intlayer';

/**
 * Caller configurations for `react-i18next`'s `useTranslation` hook.
 *
 * Tells the intlayer field-usage analyser how to extract the dictionary key
 * (namespace) and consumed fields from `useTranslation` call sites, enabling
 * accurate dictionary pruning for projects using `@intlayer/react-i18next`.
 */
const REACT_I18NEXT_COMPAT_CALLERS: CompatCallerConfig[] = [
  {
    callerName: 'useTranslation',
    importSources: ['react-i18next', '@intlayer/react-i18next'],
    namespace: { from: 'argument', index: 0 },
    keyPrefix: { from: 'option', argumentIndex: 1, property: 'keyPrefix' },
    translationFunction: 'destructured-t',
  },
];

/**
 * A Vite plugin for react-i18next compat that wraps vite-intlayer
 * and configures resolve aliases for react-i18next and i18next.
 */
export const reactI18nextVitePlugin = (
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
      ...REACT_I18NEXT_COMPAT_CALLERS,
    ],
  });

  const compatPlugin: PluginOption = {
    name: 'vite-react-i18next-compat-plugin',
    config: () => {
      return {
        resolve: {
          alias: {
            'react-i18next': '@intlayer/react-i18next',
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

export default reactI18nextVitePlugin;
