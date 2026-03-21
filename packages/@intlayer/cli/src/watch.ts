import { logConfigDetails } from '@intlayer/chokidar/cli';
import { runParallel } from '@intlayer/chokidar/utils';
import { watch } from '@intlayer/chokidar/watcher';
import { getAppLogger } from '@intlayer/config/logger';
import {
  type GetConfigurationOptions,
  getConfiguration,
} from '@intlayer/config/node';

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
  logConfigDetails(options?.configOptions);

  const appLogger = getAppLogger(config);

  // Store references to the child process
  let parallelProcess: ReturnType<typeof runParallel> | undefined;

  if (options?.with) {
    parallelProcess = runParallel(options.with);
    // Handle the promise to avoid unhandled rejection
    parallelProcess.result.catch(() => {
      // Parallel process failed or was terminated
      process.exit(1);
    });
  }

  // Capture the watcher instance
  const watcher = watch({
    persistent: true,
    skipPrepare: options?.skipPrepare ?? false,
  });

  // Define a Graceful Shutdown function
  let isShuttingDown = false;
  const handleShutdown = async () => {
    // Prevent multiple calls
    if (isShuttingDown) return;
    isShuttingDown = true;

    appLogger('Stopping Intlayer watcher...');

    try {
      // Kill the parallel process (e.g., Next.js) before closing the watcher
      if (parallelProcess) {
        parallelProcess.kill();
      }

      // Close the file watcher to stop "esbuild service not running" errors
      await watcher.close();
    } catch (error) {
      console.error('Error during shutdown:', error);
    } finally {
      process.exit(0);
    }
  };

  // Attach Signal Listeners
  process.on('SIGINT', handleShutdown);
  process.on('SIGTERM', handleShutdown);
};
