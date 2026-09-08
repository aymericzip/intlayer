import {
  type GetConfigurationOptions,
  getConfiguration,
} from '@intlayer/config/node';
import { logConfigDetails } from '@intlayer/engine/cli';
import {
  claimCliContentWatcher,
  type ParallelHandle,
  reportRedundantContentWatcher,
  runParallel,
} from '@intlayer/engine/utils';
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

  // Only watch mode keeps a watcher alive; a one-off build has nothing to
  // deduplicate. Claimed before the child is spawned so the bundler plugin
  // inside it stands down instead of racing this command.
  if (options?.watch) {
    const bundlerAlreadyWatching = await claimCliContentWatcher(
      config,
      'intlayer build --watch'
    );

    if (bundlerAlreadyWatching) {
      reportRedundantContentWatcher(config, {
        cliLabel: 'intlayer build --watch',
        bundlerLabel: bundlerAlreadyWatching.label,
        since: bundlerAlreadyWatching.since,
      });
    }
  }

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
