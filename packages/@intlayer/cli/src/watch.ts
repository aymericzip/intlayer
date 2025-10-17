import { runParallel, watch } from '@intlayer/chokidar';
import {
  type GetConfigurationOptions,
  getAppLogger,
  getConfiguration,
} from '@intlayer/config';

type WatchOptions = {
  skipPrepare?: boolean;
  with?: string | string[];
  configOptions?: GetConfigurationOptions;
};

/**
 * Get locales dictionaries .content.{json|ts|tsx|js|jsx|mjs|cjs} and build the JSON dictionaries in the .intlayer directory.
 * Watch mode available to get the change in the .content.{json|ts|tsx|js|jsx|mjs|cjs}
 */
export const watchContentDeclaration = async (options?: WatchOptions) => {
  const config = getConfiguration(options?.configOptions);
  const appLogger = getAppLogger(config);

  if (options?.with) {
    runParallel(options.with);
  }

  appLogger('Watching Intlayer content declarations');

  watch({
    persistent: true,
    skipPrepare: options?.skipPrepare ?? false,
  });
};
