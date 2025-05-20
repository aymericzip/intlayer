import { buildAndWatchIntlayer } from '@intlayer/chokidar';
import {
  getConfiguration,
  type GetConfigurationOptions,
} from '@intlayer/config';

type BuildOptions = {
  watch?: boolean;
  configOptions?: GetConfigurationOptions;
};

/**
 * Get locales dictionaries .content.{json|ts|tsx|js|jsx|mjs|cjs} and build the JSON dictionaries in the .intlayer directory.
 * Watch mode available to get the change in the .content.{json|ts|tsx|js|jsx|mjs|cjs}
 */
export const build = async (options?: BuildOptions) => {
  const config = getConfiguration(options?.configOptions);

  await buildAndWatchIntlayer({
    persistent: options?.watch ?? false,
    configuration: config,
  });
};
