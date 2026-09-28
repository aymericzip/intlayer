import { getAppLogger } from '@intlayer/config/logger';
import type { IntlayerConfig } from '@intlayer/types/config';
import {
  acquireContentWatcherLock,
  getCliContentWatcherLabel,
  getContentWatcherOwner,
  reportRedundantContentWatcher,
} from './contentWatcherLock';

/**
 * How often a process that lost the ownership race checks whether the owner is
 * gone, so it can take over once that process stops (e.g. a short-lived config
 * process, or a second dev server).
 */
const TAKEOVER_POLL_INTERVAL_MS = 5000;

export type StartContentWatcherOptions = {
  /**
   * How the integration names itself in the lock and in messages, e.g.
   * `vite-intlayer`.
   */
  label: string;
  /**
   * Whether this process must never own the watcher, re-checked on every
   * attempt (e.g. a helper process that outlives the dev server).
   */
  getShouldSkip?: () => boolean;
};

type ContentWatcherState = {
  /** Set once the watcher is running in this process. */
  isWatching: boolean;
  /**
   * Set while an ownership attempt is in flight: taking the lock is
   * asynchronous, and integrations re-enter on config reloads or server
   * restarts.
   */
  isClaimInFlight: boolean;
};

/**
 * Per-process state, kept on `globalThis` rather than in module scope: a process
 * can load both the CJS and ESM builds of this package, and hot-reloading
 * servers (`bun --hot`, Vite SSR) re-evaluate modules without restarting — each
 * copy must still see the watcher the first one started.
 */
const getContentWatcherState = (): ContentWatcherState => {
  const stateKey = Symbol.for('intlayer.contentWatcher');
  const globalScope = globalThis as typeof globalThis & {
    [key: symbol]: ContentWatcherState | undefined;
  };

  globalScope[stateKey] ??= { isWatching: false, isClaimInFlight: false };

  return globalScope[stateKey];
};

const claimAndWatch = async (
  configuration: IntlayerConfig,
  options: StartContentWatcherOptions
): Promise<void> => {
  const state = getContentWatcherState();

  const hasAcquiredLock = await acquireContentWatcherLock(configuration, {
    source: 'bundler',
    label: options.label,
  });

  if (!hasAcquiredLock) {
    const owner = await getContentWatcherOwner(configuration);

    // A CLI watcher started from another terminal is just as redundant as one
    // wrapping this command, and worth the same explanation.
    if (owner?.source === 'cli') {
      reportRedundantContentWatcher(configuration, {
        cliLabel: owner.label,
        bundlerLabel: options.label,
      });
      return;
    }

    // Another integration owns the watcher: retry in the background so this
    // process picks it up if that one stops first.
    const retryTimer = setTimeout(() => {
      startContentWatcher(configuration, options);
    }, TAKEOVER_POLL_INTERVAL_MS);

    // Unreferenced so a process whose only remaining work is this retry can
    // still exit.
    retryTimer.unref?.();

    return;
  }

  state.isWatching = true;

  try {
    // Imported lazily: the watcher pulls in `@parcel/watcher`, a native module
    // with no business being loaded during a production build.
    const { watch } = await import('../watcher');

    await watch({ configuration });
  } catch (error) {
    state.isWatching = false;

    getAppLogger(configuration)(
      ['Failed to watch Intlayer content declarations:', error],
      { level: 'error' }
    );
  }
};

/**
 * Starts the content declaration watcher from an integration (bundler plugin or
 * server middleware), making sure only one watcher rebuilds a project's
 * dictionaries.
 *
 * - Idempotent within a process, across module copies and hot reloads.
 * - Stands down, with an explanation, when `intlayer watch` already covers the
 *   project, whether it spawned this process (`--with`) or runs elsewhere.
 * - Otherwise the first process to take the project lock watches; the others
 *   retry in the background to take over once it stops.
 *
 * Not awaitable on purpose: a dev server must not wait on the watcher to serve.
 *
 * @param configuration - The resolved Intlayer configuration.
 * @param options - How the integration identifies itself.
 *
 * @example
 * ```ts
 * configureServer() {
 *   startContentWatcher(configuration, { label: 'vite-intlayer' });
 * }
 * ```
 */
export const startContentWatcher = (
  configuration: IntlayerConfig,
  options: StartContentWatcherOptions
): void => {
  const state = getContentWatcherState();

  if (state.isWatching || state.isClaimInFlight) return;
  if (!configuration.content.watch) return;
  if (options.getShouldSkip?.()) return;

  // Spawned by `intlayer watch --with`: the CLI watcher covers the project, and
  // this is known from the environment alone — no need to touch the lock.
  const cliWatcherLabel = getCliContentWatcherLabel();

  if (cliWatcherLabel) {
    reportRedundantContentWatcher(configuration, {
      cliLabel: cliWatcherLabel,
      bundlerLabel: options.label,
    });
    return;
  }

  state.isClaimInFlight = true;

  claimAndWatch(configuration, options).finally(() => {
    state.isClaimInFlight = false;
  });
};
