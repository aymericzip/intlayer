import { prepareIntlayer, watch } from '@intlayer/chokidar';
import { getConfiguration } from '@intlayer/config';
import { defineNuxtModule } from '@nuxt/kit';
import type { NuxtModule } from '@nuxt/schema';
import { join, relative, resolve } from 'path';

// @ts-ignore fix instantiation is excessively deep and possibly infinite
export const module: NuxtModule = defineNuxtModule({
  meta: {
    name: 'nuxt-intlayer',
  },
  setup({}, nuxt) {
    const configuration = getConfiguration();

    //     // Add the intlayer client plugin
    //     addPlugin({
    //       src: `
    // import { defineNuxtPlugin } from '#app';
    // import { installIntlayer } from 'vue-intlayer';

    // export default defineNuxtPlugin((nuxtApp) => {
    //   installIntlayer(nuxtApp.vueApp);
    // });
    //       `,
    //       mode: 'client',
    //     });

    // Equivalent to buildStart in Vite plugin
    nuxt.hook('build:before', async () => {
      await prepareIntlayer(configuration);
    });

    // Equivalent to configureServer in Vite plugin
    nuxt.hook('ready', async () => {
      if (configuration.content.watch) {
        // Start watching when dev server is ready
        watch({ configuration });
      }
    });

    const { mainDir, baseDir, configDir } = configuration.content;

    const dictionariesPath = join(mainDir, 'dictionaries.mjs');
    const relativeDictionariesPath = relative(baseDir, dictionariesPath);

    const unmergedDictionariesPath = join(mainDir, 'unmerged_dictionaries.mjs');
    const relativeUnmergedDictionariesPath = relative(
      baseDir,
      unmergedDictionariesPath
    );

    const configurationPath = join(configDir, 'configuration.json');
    const relativeConfigurationPath = relative(baseDir, configurationPath);

    nuxt.options.alias = {
      ...nuxt.options.alias,
      '@intlayer/dictionaries-entry': resolve(relativeDictionariesPath),
      '@intlayer/unmerged-dictionaries-entry': resolve(
        relativeUnmergedDictionariesPath
      ),
      '@intlayer/config/built': resolve(relativeConfigurationPath),
    };
  },
});
