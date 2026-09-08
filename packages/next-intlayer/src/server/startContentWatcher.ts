import { getAppLogger } from '@intlayer/config/logger';
import {
  acquireContentWatcherLock,
  getCliContentWatcherLabel,
  getContentWatcherOwner,
  reportRedundantContentWatcher,
} from '@intlayer/engine/utils';
import type { IntlayerConfig } from '@intlayer/types/config';

/**
 * Release from which `withIntlayer` watches the content declarations on
 * Turbopack, making `intlayer watch --with` redundant on Next.js.
 */
const SELF_WATCHING_RELEASE = '9.5.0';

/**
 * How often a process that lost the ownership race checks whether the owner is
 * gone. Next.js's short-lived config processes release the lock when they exit,
 * so the long-lived dev server has to be able to pick it up afterwards.
 */
const TAKEOVER_POLL_INTERVAL_MS = 5000;

/** Set once the watcher is running in this process. */
let isWatching = false;

/**
 * Set while an ownership attempt is in flight.
 *
 * Taking the lock is asynchronous, and `next.config.*` is evaluated several
 * times per command — without this, those evaluations would pile up concurrent
 * attempts, each awaiting the same lock.
 */
let isClaimInFlight = false;

/** Reports a redundant `intlayer watch` running alongside this dev server. */
const reportRedundantCliWatcher = (
  configuration: IntlayerConfig,
  cliWatcherLabel: string
): void =>
  reportRedundantContentWatcher(configuration, {
    cliLabel: cliWatcherLabel,
    bundlerLabel: 'next-intlayer',
    since: SELF_WATCHING_RELEASE,
  });

/**
 * Starts the content declaration watcher for a Turbopack dev server.
 *
 * On webpack this is done by `IntlayerPlugin`, which Turbopack cannot run — so
 * before {@link SELF_WATCHING_RELEASE} a Turbopack app had to be started
 * through `intlayer watch --with next dev` for `.content` edits to rebuild
 * `.intlayer`.
 *
 * Stands down — with an explanation — when that CLI watcher is running anyway,
 * since two watchers would rebuild the same dictionaries at the same time.
 * Otherwise starting is idempotent: the first process to take the lock watches,
 * and the others retry in the background so a short-lived config process
 * handing the lock back does not leave the session unwatched.
 *
 * @param configuration - The resolved Intlayer configuration.
 */
const claimAndWatch = async (configuration: IntlayerConfig): Promise<void> => {
  const appLogger = getAppLogger(configuration);

  const hasAcquiredLock = await acquireContentWatcherLock(configuration, {
    source: 'bundler',
    label: 'next-intlayer',
    since: SELF_WATCHING_RELEASE,
  });

  if (!hasAcquiredLock) {
    // A CLI watcher started from another terminal is just as redundant as one
    // wrapping this command, and worth the same explanation.
    const owner = await getContentWatcherOwner(configuration);

    if (owner?.source === 'cli') {
      reportRedundantCliWatcher(configuration, owner.label);
      return;
    }

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
    // native module that has no business being loaded during a production
    // build. `withIntlayer` already awaited `prepareIntlayer`, so the watcher
    // only has to pick up the changes that follow.
    const { watch } = await import('@intlayer/engine/watcher');

    await watch({ configuration });
  } catch (error) {
    isWatching = false;

    appLogger(['Failed to watch Intlayer content declarations:', error], {
      level: 'error',
    });
  }
};

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

  // Deliberately not awaited: `withIntlayerSync` is synchronous, and the dev
  // server must not wait on the watcher to start serving.
  claimAndWatch(configuration).finally(() => {
    isClaimInFlight = false;
  });
};
