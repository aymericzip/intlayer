import { getAppLogger } from '@intlayer/config/logger';
import {
  acquireContentWatcherLock,
  getCliContentWatcherLabel,
  getContentWatcherOwner,
  reportRedundantContentWatcher,
} from '@intlayer/engine/utils';
import type { IntlayerConfig } from '@intlayer/types/config';

/** How the Vite integration names itself in the lock and in messages. */
const BUNDLER_LABEL = 'vite-intlayer';

/**
 * How often a process that lost the ownership race checks whether the owner is
 * gone, so a second dev server can take over once the first one stops.
 */
const TAKEOVER_POLL_INTERVAL_MS = 5000;

/** Set once the watcher is running in this process. */
let isWatching = false;

/**
 * Set while an ownership attempt is in flight.
 *
 * `configureServer` runs again on every Vite server restart (e.g. after a
 * config edit), and taking the lock is asynchronous — without this, restarts
 * would pile up concurrent attempts.
 */
let isClaimInFlight = false;

/** Reports a redundant `intlayer watch` running alongside this dev server. */
const reportRedundantCliWatcher = (
  configuration: IntlayerConfig,
  cliWatcherLabel: string
): void =>
  reportRedundantContentWatcher(configuration, {
    cliLabel: cliWatcherLabel,
    bundlerLabel: BUNDLER_LABEL,
  });

const claimAndWatch = async (configuration: IntlayerConfig): Promise<void> => {
  const appLogger = getAppLogger(configuration);

  const hasAcquiredLock = await acquireContentWatcherLock(configuration, {
    source: 'bundler',
    label: BUNDLER_LABEL,
  });

  if (!hasAcquiredLock) {
    // A CLI watcher started from another terminal is just as redundant as one
    // wrapping this command, and worth the same explanation.
    const owner = await getContentWatcherOwner(configuration);

    if (owner?.source === 'cli') {
      reportRedundantCliWatcher(configuration, owner.label);
      return;
    }

    // Another dev server owns the watcher: retry in the background so this one
    // picks it up if that server stops first.
    const retryTimer = setTimeout(() => {
      startContentWatcher(configuration);
    }, TAKEOVER_POLL_INTERVAL_MS);

    // Unreferenced so a process whose only remaining work is this retry can
    // still exit.
    retryTimer.unref?.();

    return;
  }

  isWatching = true;

  try {
    // Imported lazily: `@intlayer/engine/watcher` pulls in `@parcel/watcher`, a
    // native module only needed once the dev server actually starts.
    const { watch } = await import('@intlayer/engine/watcher');

    await watch({ configuration });
  } catch (error) {
    isWatching = false;

    appLogger(['Failed to watch Intlayer content declarations:', error], {
      level: 'error',
    });
  }
};

/**
 * Starts the content declaration watcher for a Vite dev server.
 *
 * Takes the project's content watcher lock first, so only one process rebuilds
 * the dictionaries: it stands down — with an explanation — when `intlayer watch`
 * is already running, and lets other tools (e.g. the VS Code extension) see that
 * a watcher covers the project.
 *
 * Deliberately not awaited by the caller: the dev server must not wait on the
 * watcher to start serving.
 *
 * @param configuration - The resolved Intlayer configuration.
 */
export const startContentWatcher = (configuration: IntlayerConfig): void => {
  if (isWatching || isClaimInFlight) return;
  if (!configuration.content.watch) return;

  // Spawned by `intlayer watch --with`: the CLI watcher covers the project, and
  // this is known from the environment alone — no need to touch the lock.
  const cliWatcherLabel = getCliContentWatcherLabel();

  if (cliWatcherLabel) {
    reportRedundantCliWatcher(configuration, cliWatcherLabel);
    return;
  }

  isClaimInFlight = true;

  claimAndWatch(configuration).finally(() => {
    isClaimInFlight = false;
  });
};
