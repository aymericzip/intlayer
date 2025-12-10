import type { IntlayerConfig } from '@intlayer/types';
import type { PluginOption } from 'vite';

export const intlayerVueAsyncPlugin = (
  configuration: IntlayerConfig,
  filesList: string[]
): PluginOption => {
  const { importMode, optimize } = configuration.build;

  return {
    /**
     * On vue, we pre-insert the 'await' to the useIntlayer call
     * It will trigger the transformation of the async call by the vue compiler
     *
     * Then the second plugin will make the second transformation to replace the useIntlayer call by the useDictionaryDynamic call
     */
    name: 'vite-intlayer-simple-transform',
    enforce: 'pre', // Run before Vue so Vue sees the 'await'
    apply: (_config, env) => {
      // Only apply babel plugin if optimize is enabled

      const isBuild = env.command === 'build';
      const isEnabled =
        (optimize === undefined && isBuild) || optimize === true;
      const isAsync = importMode === 'dynamic' || importMode === 'live';

      return isEnabled && isAsync;
    },

    transform(code, id) {
      // Only process .vue files
      // The await injection is only needed for Vue to trigger async component compilation
      if (!id.endsWith('.vue')) return null;

      /**
       * Transform file as
       * .../HelloWorld.vue?vue&type=script&setup=true&lang.ts
       * Into
       * .../HelloWorld.vue
       *
       * Prevention for virtual file
       */
      const filename = id.split('?', 1)[0];

      if (!filesList.includes(filename)) return null;

      // Check if the file actually uses the composable to avoid unnecessary work
      if (!code.includes('useIntlayer')) return null;

      // B. Add 'await' to the function call
      //    Matches: useIntlayer(args) -> await useIntlayer(args)
      //    Note: Since we aliased the import above, 'useIntlayer' now refers to 'useDictionaryAsync'
      const transformedCode = code.replace(
        /(\s+|=\s*)useIntlayer\s*\(/g,
        '$1await useIntlayer('
      );

      return {
        code: transformedCode,
        map: null, // Simple string replace doesn't strictly need a sourcemap for this case
      };
    },
  };
};
