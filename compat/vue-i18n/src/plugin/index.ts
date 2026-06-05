import type { PluginOption } from 'vite';
import { intlayer } from 'vite-intlayer';

/**
 * A Vite plugin for vue-i18n compat that wraps vite-intlayer
 * and configures resolve aliases for vue-i18n.
 */
export const vueI18nVitePlugin = (
  options?: Parameters<typeof intlayer>[0]
): PluginOption[] => {
  const basePlugins = intlayer(options);

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
