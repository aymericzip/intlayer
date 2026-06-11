import { join } from 'node:path';
import { runOnce } from '@intlayer/chokidar/utils';
import * as ANSIColors from '@intlayer/config/colors';
import { colorize, getAppLogger } from '@intlayer/config/logger';
import { getConfiguration } from '@intlayer/config/node';
import type { PluginOption } from 'vite';
import { type CompatCallerConfig, intlayer } from 'vite-intlayer';

/**
 * Caller configurations for vue-i18n's `useI18n` composable.
 *
 * Tells the intlayer field-usage analyser how to extract the dictionary key
 * (namespace) from `useI18n({ namespace: 'ns' })` call sites, enabling
 * accurate dictionary pruning for projects using `@intlayer/vue-i18n`.
 */
const VUE_I18N_COMPAT_CALLERS: CompatCallerConfig[] = [
  {
    callerName: 'useI18n',
    importSources: ['vue-i18n', '@intlayer/vue-i18n'],
    namespace: { from: 'option', argumentIndex: 0, property: 'namespace' },
    translationFunction: 'destructured-t',
  },
];

/**
 * A Vite plugin for vue-i18n compat that wraps vite-intlayer
 * and configures resolve aliases for vue-i18n.
 */
export const vueI18nVitePlugin = (
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
      ...VUE_I18N_COMPAT_CALLERS,
    ],
  });

  const compatPlugin: PluginOption = {
    name: 'vite-vue-i18n-compat-plugin',
    config: () => {
      return {
        resolve: {
          alias: {
            'vue-i18n': '@intlayer/vue-i18n',
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

export default vueI18nVitePlugin;
