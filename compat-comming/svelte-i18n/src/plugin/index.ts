import { join } from 'node:path';
import { SVELTE_I18N_CALLERS } from '@intlayer/config/callers';
import * as ANSIColors from '@intlayer/config/colors';
import { colorize, getAppLogger } from '@intlayer/config/logger';
import { getConfiguration } from '@intlayer/config/node';
import { runOnce } from '@intlayer/engine/utils';
import type { PluginOption } from 'vite';
import { intlayer } from 'vite-intlayer';

/**
 * A Vite plugin for svelte-i18n compat that wraps vite-intlayer
 * and configures resolve aliases for svelte-i18n.
 */
export const svelteI18nVitePlugin = (
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
    compatCallers: [...(options?.compatCallers ?? []), ...SVELTE_I18N_CALLERS],
  });

  const compatPlugin: PluginOption = {
    name: 'vite-svelte-i18n-compat-plugin',
    config: () => {
      return {
        resolve: {
          alias: {
            'svelte-i18n': '@intlayer/svelte-i18n',
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

export default svelteI18nVitePlugin;
