import { IntlayerConfig } from '@intlayer/config';
// @ts-ignore - Fix error Module '"vite"' has no exported member
import { type PluginOption } from 'vite';

const importmap: Record<string, string> = {
  '@intlayer/dictionaries-entry': 'http://localhost:4000/dictionaries',
  '@intlayer/dictionaries-entry/': 'http://localhost:4000/dictionaries/',
  '@intlayer/dynamic-dictionaries-entry':
    'http://localhost:4000/dynamic_dictionaries',
  '@intlayer/dynamic-dictionaries-entry/':
    'http://localhost:4000/dynamic_dictionaries/',
  '@intlayer/unmerged-dictionaries-entry':
    'http://localhost:4000/unmerged_dictionaries',
  '@intlayer/unmerged-dictionaries-entry/':
    'http://localhost:4000/unmerged_dictionaries/',
  '@intlayer/config/built': 'http://localhost:4000/configuration',
};

const importKeys = Object.keys(importmap);

/**
 *
 * A Vite plugin that integrates Intlayer configuration into the build process
 *
 * ```ts
 * // Example usage of the plugin in a Vite configuration
 * export default defineConfig({
 *   plugins: [ intlayerLiveSync() ],
 * });
 * ```
 *  */
export const intlayerLiveSync = (
  intlayerConfig: IntlayerConfig
): PluginOption => {
  const { liveSync } = intlayerConfig.editor;

  if (!liveSync) {
    return [];
  }

  const plugins: PluginOption[] = [
    {
      name: 'vite-intlayer-live-sync-plugin',
      transformIndexHtml: (html) => {
        return {
          html,
          tags: [
            {
              tag: 'script',
              attrs: { type: 'importmap' },
              injectTo: 'head',
              children: JSON.stringify({
                imports: importmap,
              }),
            },
          ],
        };
      },
      config: (config) => {
        config.optimizeDeps = {
          ...config.optimizeDeps,
          exclude: [...(config.optimizeDeps?.exclude ?? []), ...importKeys],
        };

        const existingSSRExternal = config.ssr?.external;
        const nextSSRExternal = Array.isArray(existingSSRExternal)
          ? [...existingSSRExternal, ...importKeys]
          : [...importKeys];

        config.ssr = {
          ...config.ssr,
          external: nextSSRExternal,
        };

        config.build = {
          ...config.build,
          rollupOptions: {
            ...config.build?.rollupOptions,
            external: (() => {
              const previousExternal = config.build?.rollupOptions?.external;

              if (typeof previousExternal === 'function') {
                return (
                  source: string,
                  importer?: string,
                  isResolved?: boolean
                ) =>
                  previousExternal(source, importer, !!isResolved) === true ||
                  importKeys.includes(source);
              }

              if (Array.isArray(previousExternal)) {
                return [...previousExternal, ...importKeys];
              }

              if (
                typeof previousExternal === 'string' ||
                previousExternal instanceof RegExp
              ) {
                return [previousExternal, ...importKeys];
              }

              return [...importKeys];
            })() as any,
          },
        };

        return config;
      },
    },
  ];

  return plugins;
};
