import type { PluginOption } from 'vite';
import { intlayer } from 'vite-intlayer';

/**
 * A Vite plugin for react-i18next compat that wraps vite-intlayer
 * and configures resolve aliases for react-i18next and i18next.
 */
export const reactI18nextVitePlugin = (
  options?: Parameters<typeof intlayer>[0]
): PluginOption[] => {
  const basePlugins = intlayer(options);

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
