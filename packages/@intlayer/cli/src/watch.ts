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

  appLogger('Watching Intlayer content declarations');

  // Capture the watcher instance
  const watcher = watch({
    persistent: true,
    skipPrepare: options?.skipPrepare ?? false,
  });

  // Define a Graceful Shutdown function
  const handleShutdown = async () => {
    // Prevent multiple calls
    process.off('SIGINT', handleShutdown);
    process.off('SIGTERM', handleShutdown);

    appLogger('Stopping Intlayer watcher...');

    try {
      // Close the file watcher immediately to stop "esbuild service not running" errors
      await watcher.close();

      // If runParallel exposes the child process, we can try to kill it explicitly.
      // Even if it doesn't, process.exit() below usually cleans up attached children.
      if (parallelProcess && 'child' in parallelProcess) {
        // @ts-ignore - Assuming child exists on the return type if runParallel is based on spawn/exec
        parallelProcess.child?.kill('SIGTERM');
      }
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
