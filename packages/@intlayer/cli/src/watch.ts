import { runParallel, watch as watchIntlayer } from '@intlayer/chokidar';
import {
  getAppLogger,
  getConfiguration,
  type GetConfigurationOptions,
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
export const watch = async (options?: WatchOptions) => {
  const config = getConfiguration(options?.configOptions);
  const appLogger = getAppLogger(config);

  if (options?.with) {
    runParallel(options.with);
  }

  appLogger('Watching Intlayer content declarations');

  await watchIntlayer({
    skipPrepare: options?.skipPrepare ?? false,
  });
};
