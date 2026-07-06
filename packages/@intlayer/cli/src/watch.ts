import { getAppLogger } from '@intlayer/config/logger';
import {
  type GetConfigurationOptions,
  getConfiguration,
} from '@intlayer/config/node';
import { logConfigDetails } from '@intlayer/engine/cli';
import { runParallel } from '@intlayer/engine/utils';
import { watch } from '@intlayer/engine/watcher';

type WatchOptions = {
  skipPrepare?: boolean;
  with?: string | string[];
  configOptions?: GetConfigurationOptions;
};

/**
 * Grace period granted to the `--with` child (e.g. Next.js/Turbopack) to exit
 * after SIGTERM before it is force-killed with SIGKILL. Detached dev servers
 * that ignore SIGTERM would otherwise re-orphan once the watcher exits.
 */
const SHUTDOWN_GRACE_MS = 3000;

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

  // Declared before the child is spawned so the failure handler below can tell a
  // genuine crash apart from the SIGKILL we send during shutdown.
  let isShuttingDown = false;

  if (options?.with) {
    parallelProcess = runParallel(options.with);
    // Handle the promise to avoid unhandled rejection
    parallelProcess.result.catch(() => {
      // During shutdown the child is expected to reject (we force-kill it); that
      // must not be reported as a crash.
      if (isShuttingDown) return;
      // Parallel process failed or was terminated
      process.exit(1);
    });
  }

  // Capture the watcher instance
  const watcher = await watch({
    persistent: true,
    skipPrepare: options?.skipPrepare ?? false,
  });

  // Define a Graceful Shutdown function
  const handleShutdown = async () => {
    // Prevent multiple calls
    if (isShuttingDown) return;
    isShuttingDown = true;

    appLogger('Stopping Intlayer watcher...');

    try {
      // Kill the parallel process (e.g., Next.js) before closing the watcher.
      // The child is spawned detached (its own process group), so we must wait
      // for it to actually exit — otherwise it re-orphans the moment we exit.
      if (parallelProcess) {
        const { kill, result } = parallelProcess;

        kill('SIGTERM'); // graceful termination of the whole process group

        // Escalate to SIGKILL if the child ignores SIGTERM within the grace
        // period (some dev servers/bundlers do), so it can never be left behind.
        let killTimer: NodeJS.Timeout | undefined;
        const graceDeadline = new Promise<void>((resolveDeadline) => {
          killTimer = setTimeout(() => {
            appLogger(
              'Parallel process did not exit after SIGTERM, sending SIGKILL...',
              { level: 'warn' }
            );
            kill('SIGKILL');
            resolveDeadline();
          }, SHUTDOWN_GRACE_MS);
        });

        // `result` rejects when the child is killed; swallow it here since the
        // outcome is already handled by the shutdown-aware catch above.
        await Promise.race([result.catch(() => {}), graceDeadline]);

        if (killTimer) clearTimeout(killTimer);
      }

      // Close all file watchers to stop "esbuild service not running" errors
      await Promise.all(
        watcher?.map((watcherEl) => watcherEl.unsubscribe()) ?? []
      );
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
