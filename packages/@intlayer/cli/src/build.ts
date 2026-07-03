import {
  type GetConfigurationOptions,
  getConfiguration,
} from '@intlayer/config/node';
import { logConfigDetails } from '@intlayer/engine/cli';
import { type ParallelHandle, runParallel } from '@intlayer/engine/utils';
import { buildAndWatchIntlayer } from '@intlayer/engine/watcher';

type BuildOptions = {
  watch?: boolean;
  skipPrepare?: boolean;
  with?: string | string[];
  configOptions?: GetConfigurationOptions;
};

/**
 * Get locales dictionaries .content.{json|ts|tsx|js|jsx|mjs|cjs} and build the JSON dictionaries in the .intlayer directory.
 * Watch mode available to get the change in the .content.{json|ts|tsx|js|jsx|mjs|cjs}
 */
export const build = async (options?: BuildOptions) => {
  const config = getConfiguration(options?.configOptions);
  logConfigDetails(options?.configOptions);

  let parallelProcess: ParallelHandle | null = null;

  if (options?.with) {
    parallelProcess = runParallel(options.with);
    // Handle the promise to avoid unhandled rejection
    parallelProcess.result.catch(() => {
      // Parallel process failed or was terminated
    });
  }

  await buildAndWatchIntlayer({
    persistent: options?.watch ?? false,
    skipPrepare: options?.skipPrepare ?? false,
    configuration: config,
  });

  if (!options?.watch && parallelProcess) {
    parallelProcess.kill();
  }
};
