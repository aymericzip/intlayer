import { rmSync } from 'node:fs';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import * as ANSIColors from '@intlayer/config/colors';
import { colorize, getAppLogger } from '@intlayer/config/logger';
import type { IntlayerConfig } from '@intlayer/types/config';

/**
 * What kind of process is watching the content declarations.
 *
 * - `cli` — the `intlayer watch` / `intlayer build --watch` command.
 * - `bundler` — an Intlayer bundler plugin (e.g. `withIntlayer` on Next.js).
 */
export type ContentWatcherSource = 'cli' | 'bundler';

export type ContentWatcherOwner = {
  /** PID of the process holding the watcher. */
  pid: number;
  source: ContentWatcherSource;
  /**
   * How the owner should be named in a message, e.g. `intlayer watch` or
   * `next-intlayer`.
   */
  label: string;
};

/**
 * Set on every process spawned by `intlayer watch --with` (and
 * `intlayer build --watch --with`), so a bundler plugin running as that child
 * knows a CLI watcher is already covering the project — without having to
 * depend on the two processes reaching the lock file in a given order.
 *
 * Holds the label of the command that set it.
 */
export const CLI_CONTENT_WATCHER_ENV_VAR = 'INTLAYER_CLI_CONTENT_WATCHER';

/** Name of the file materialising the ownership of the content watcher. */
const CONTENT_WATCHER_LOCK_FILE_NAME = 'intlayer-content-watcher.lock';

/** How many times taking the lock may follow up on a reclaimed stale one. */
const ACQUIRE_ATTEMPTS = 3;

/** Lock owned by this process, released on exit. */
let ownedLockFilePath: string | undefined;

// The one place that has to stay synchronous: Node runs `exit` listeners to
// completion without an event loop turn, so a promise scheduled here would
// never settle and the lock would outlive the process — stalling the next dev
// session until its PID check reclaims it.
process.on('exit', () => {
  if (!ownedLockFilePath) return;

  try {
    rmSync(ownedLockFilePath, { force: true });
  } catch {}
});

/**
 * Path of the lock coordinating every content watcher of one project.
 *
 * Deliberately at the root of `.intlayer` rather than in its `cache`
 * subdirectory: `cleanOutputDir` wipes every subdirectory of `.intlayer`, so a
 * lock kept in `cache` would be erased by any `prepareIntlayer` that cleans —
 * after which a bundler plugin would see no owner and start a second watcher
 * next to the `intlayer watch` still running. The root itself is never removed.
 *
 * @param configuration - The resolved Intlayer configuration.
 */
export const getContentWatcherLockFilePath = (
  configuration: IntlayerConfig
): string => join(configuration.system.tempDir, CONTENT_WATCHER_LOCK_FILE_NAME);

/**
 * Whether a PID belongs to a process that is still running.
 */
const getIsProcessAlive = (pid: number): boolean => {
  if (pid === process.pid) return true;

  try {
    // Signal 0 checks for existence without delivering a signal.
    process.kill(pid, 0);
    return true;
  } catch (error) {
    // EPERM means the process exists but belongs to another user.
    return (error as NodeJS.ErrnoException).code === 'EPERM';
  }
};

/**
 * Reads the lock, removing it when it describes a process that has since died.
 *
 * An unreadable or malformed lock is treated as abandoned: a corrupted file
 * must never block the watcher for a whole dev session.
 *
 * @returns The live owner, or `null` when nothing is watching.
 */
export const getContentWatcherOwner = async (
  configuration: IntlayerConfig
): Promise<ContentWatcherOwner | null> => {
  const lockFilePath = getContentWatcherLockFilePath(configuration);

  let owner: Partial<ContentWatcherOwner>;

  try {
    owner = JSON.parse(await readFile(lockFilePath, 'utf8'));
  } catch {
    return null;
  }

  if (owner.pid && getIsProcessAlive(owner.pid)) {
    return {
      pid: owner.pid,
      source: owner.source ?? 'bundler',
      label: owner.label ?? 'Intlayer',
    };
  }

  try {
    await rm(lockFilePath, { force: true });
  } catch {}

  return null;
};

/**
 * Tries to become the process that watches this project's content
 * declarations.
 *
 * Creating the file with `wx` is atomic, so exactly one process wins even when
 * several try at the same moment — which is the normal case on Next.js, where
 * `next.config.*` is evaluated in more than one process.
 *
 * @param configuration - The resolved Intlayer configuration.
 * @param owner - How this process should describe itself to the others.
 * @returns `true` when this process now owns the watcher.
 */
export const acquireContentWatcherLock = async (
  configuration: IntlayerConfig,
  owner: Omit<ContentWatcherOwner, 'pid'>
): Promise<boolean> => {
  const lockFilePath = getContentWatcherLockFilePath(configuration);
  const data = JSON.stringify({
    pid: process.pid,
    ...owner,
  } satisfies ContentWatcherOwner);

  // Bounded rather than recursive: the retry only exists to follow up on a lock
  // `getContentWatcherOwner` has just reclaimed, and two processes reclaiming
  // and re-taking it in turn must not spin forever.
  for (let attempt = 0; attempt < ACQUIRE_ATTEMPTS; attempt++) {
    try {
      await mkdir(dirname(lockFilePath), { recursive: true });
      await writeFile(lockFilePath, data, { flag: 'wx' });

      ownedLockFilePath = lockFilePath;

      return true;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'EEXIST') return false;

      // A lock left behind by a dead process is reclaimed by
      // `getContentWatcherOwner`, leaving the next attempt free to take it.
      if (await getContentWatcherOwner(configuration)) return false;
    }
  }

  return false;
};

/**
 * The CLI watcher command this process was spawned by, or `null` when it was
 * not started through `intlayer watch --with`.
 */
export const getCliContentWatcherLabel = (): string | null =>
  process.env[CLI_CONTENT_WATCHER_ENV_VAR] || null;

/**
 * Registers a CLI command as the content watcher of this project.
 *
 * Call it *before* spawning a `--with` child: taking the lock first means the
 * bundler plugin inside that child never races the command for it, and the
 * environment marker makes the child's decision independent of the filesystem
 * altogether.
 *
 * @param configuration - The resolved Intlayer configuration.
 * @param label - How the command should be named in a message.
 * @returns The bundler already watching this project, or `null` when the
 * command took the watcher for itself. A CLI watcher never stands down on that
 * answer — watching is what it was asked to do — but reporting it lets the user
 * know the parallel command has become redundant.
 */
export const claimCliContentWatcher = async (
  configuration: IntlayerConfig,
  label: string
): Promise<ContentWatcherOwner | null> => {
  // Set before the first `await`: a `--with` child spawned while the lock is
  // still being written must already see the marker in its environment.
  process.env[CLI_CONTENT_WATCHER_ENV_VAR] = label;

  const hasAcquiredLock = await acquireContentWatcherLock(configuration, {
    source: 'cli',
    label,
  });

  if (hasAcquiredLock) return null;

  const owner = await getContentWatcherOwner(configuration);

  return owner?.source === 'bundler' ? owner : null;
};

/** Keeps the redundant-watcher notice to one per process. */
let hasReportedRedundantWatcher = false;

type RedundantWatcherReport = {
  /** Name of the CLI command watching, e.g. `intlayer watch`. */
  cliLabel: string;
  /** Name of the bundler integration watching, e.g. `next-intlayer`. */
  bundlerLabel: string;
};

/**
 * Reports a CLI watcher running alongside a bundler integration that watches
 * on its own, and points at the parallel command as the part to drop.
 *
 * Emitted at most once per process: a bundler config is evaluated several times
 * per command, and callers may re-enter this on a retry loop.
 *
 * @param configuration - The resolved Intlayer configuration.
 * @param report - Who is watching in parallel with whom.
 */
export const reportRedundantContentWatcher = (
  configuration: IntlayerConfig,
  { cliLabel, bundlerLabel }: RedundantWatcherReport
): void => {
  if (hasReportedRedundantWatcher) return;
  hasReportedRedundantWatcher = true;

  getAppLogger(configuration)(
    [
      colorize(cliLabel, ANSIColors.BLUE, ANSIColors.BEIGE),
      'is watching your content declarations in parallel with',
      `${colorize(bundlerLabel, ANSIColors.BLUE, ANSIColors.BEIGE)},`,
      'which watches them on its own.',
      'The parallel watch command is no longer needed — running your dev server on its own is enough.',
    ],
    { level: 'warn' }
  );
};
