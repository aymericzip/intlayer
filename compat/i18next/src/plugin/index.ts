import { join } from 'node:path';
import { I18NEXT_CALLERS } from '@intlayer/config/callers';
import * as ANSIColors from '@intlayer/config/colors';
import { colorize, getAppLogger } from '@intlayer/config/logger';
import { getConfiguration } from '@intlayer/config/node';
import { runOnce } from '@intlayer/engine/utils';
import type { PluginOption } from 'vite';
import { intlayer } from 'vite-intlayer';

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
    compatCallers: [...(options?.compatCallers ?? []), ...I18NEXT_CALLERS],
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
