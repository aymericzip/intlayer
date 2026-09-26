import { join } from 'node:path';
import {
  type CallerDescriptor,
  NGX_TRANSLATE_CALLERS,
} from '@intlayer/config/callers';
import * as ANSIColors from '@intlayer/config/colors';
import { colorize, getAppLogger } from '@intlayer/config/logger';
import { getConfiguration } from '@intlayer/config/node';
import { runOnce } from '@intlayer/engine/utils';
import type { PluginOption } from 'vite';
import { intlayer } from 'vite-intlayer';

/**
 * ngx-translate callers as the field-usage analysis must see them.
 *
 * The `| translate` pipe and `[translate]` directive read keys from Angular
 * templates that no JS analyser parses, so a `translate('home.title')` call
 * in a component class cannot prove which other fields of `home` its
 * template needs. Every dictionary reached from ngx-translate is therefore
 * kept whole (`'all'`); dictionaries only read through `useIntlayer` still
 * get pruned.
 */
export const NGX_TRANSLATE_BUILD_CALLERS: CallerDescriptor[] =
  NGX_TRANSLATE_CALLERS.map((descriptor) => ({
    ...descriptor,
    translationFunction: 'all',
  }));

/**
 * Vite plugin for Angular apps built with Vite (Analog): wraps vite-intlayer
 * and aliases `@ngx-translate/core` to `@intlayer/ngx-translate`.
 *
 * Angular CLI apps use `@intlayer/ngx-translate/esbuild` instead.
 */
export const ngxTranslateVitePlugin = (
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
      ...NGX_TRANSLATE_BUILD_CALLERS,
    ],
  });

  const compatPlugin: PluginOption = {
    name: 'vite-ngx-translate-compat-plugin',
    config: () => ({
      resolve: {
        alias: {
          '@ngx-translate/core': '@intlayer/ngx-translate',
        },
      },
    }),
  };

  return [
    ...(Array.isArray(basePlugins) ? basePlugins : [basePlugins]),
    compatPlugin,
  ];
};

export default ngxTranslateVitePlugin;
