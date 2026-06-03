#!/usr/bin/env node

/**
 * This script watches for changes in JavaScript, TypeScript, and related files
 * (such as .jsx, .tsx) in the current directory and its subdirectaries.
 * When a file is changed or added, it triggers a specified npm command (default is 'build')
 * in each relevant package based on the file path.
 *
 * The command can be customized with the --command flag. It runs the command in each package
 * listed in the `packageBuildOrder`, a predefined array of package paths.
 * The script continues to run even if one of the commands fails, and logs all activity.
 *
 * It uses `@parcel/watcher` for native file system watching and `minimist` for parsing
 * command-line arguments.
 *
 * @module FileWatcher
 */

import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import process from 'node:process';
import minimist from 'minimist';
import { packageBuildOrder } from './package-build-order.mjs';

const args = minimist(process.argv.slice(2));
const chosenCommand = args.command ?? 'build';

// Absolute monorepo root — needed to resolve relative packageBuildOrder entries
// so that startsWith comparisons work against absolute event.path values from
// @parcel/watcher (which always emits absolute paths).
const ROOT_DIR = process.cwd().replace(/\\/g, '/');

// Pre-resolve every package path once, keeping index parity with packageBuildOrder.
const absPkgPaths = packageBuildOrder.map((pkg) =>
  resolve(ROOT_DIR, pkg).replace(/\\/g, '/')
);

// Queue system for handling multiple changes
let buildTimeout = null;
const pendingChanges = new Set();
const DEBOUNCE_DELAY = 1000; // 1 second delay

/**
 * Normalizes a file path to use forward slashes, which is consistent across platforms.
 * @param {string} filePath - The file path to normalize.
 * @returns {string} The normalized file path.
 */
const normalizePath = (filePath) => filePath.replace(/\\/g, '/');

/**
 * Runs the chosen command in each relevant package, based on the changed file paths.
 *
 * @param {Set<string>} paths - The set of changed file paths (absolute)
 */
const runBuild = (paths) => {
  try {
    console.info(
      `\nDetected changes in ${paths.size} files. Running "${chosenCommand}"...\n`
    );

    // Get unique packages that need to be rebuilt using pre-resolved absolute paths.
    const packagesToRebuild = new Set();
    for (const path of paths) {
      const normalizedPath = normalizePath(path);
      for (let i = 0; i < absPkgPaths.length; i++) {
        const absPath = absPkgPaths[i];
        const pkgPath = absPath.endsWith('/') ? absPath : `${absPath}/`;
        if (normalizedPath.startsWith(pkgPath)) {
          packagesToRebuild.add(packageBuildOrder[i]);
        }
      }
    }

    for (const pkg of packagesToRebuild) {
      console.info(`\n--- Running "${chosenCommand}" in ${pkg} ---\n`);
      const result = spawnSync('bun', ['run', chosenCommand], {
        cwd: resolve(ROOT_DIR, pkg),
        stdio: 'inherit',
        shell: true,
      });

      if (result.status !== 0) {
        console.error(
          `\n[ERROR] Command "${chosenCommand}" failed in ${pkg}. Continuing to watch...\n`
        );
      }
    }
    console.info(`\n[SUCCESS] Command "${chosenCommand}" completed.\n`);
  } catch (err) {
    console.error('Failed to run build:', err);
  }
};

/**
 * Queues a file change for processing
 * @param {string} path - The path of the changed file
 */
const queueChange = (path) => {
  pendingChanges.add(path);

  if (buildTimeout) {
    clearTimeout(buildTimeout);
  }

  buildTimeout = setTimeout(() => {
    const changesToProcess = new Set(pendingChanges);
    pendingChanges.clear();
    runBuild(changesToProcess);
  }, DEBOUNCE_DELAY);
};

const IGNORED_GLOBS = [
  '**/node_modules/**',
  '**/dist/**',
  '**/build/**',
  '**/.next/**',
  '**/.svelte-kit/**',
  '**/.intlayer/**',
  '**/*.test.*',
  '**/tsup.config.bundled_*',
];

const FILE_EXT_RE = /\.(js|cjs|mjs|ts|jsx|tsx|vue|json|svelte)$/;

let subscriptions = [];
let restartTimeout = null;

/**
 * Schedules a watcher restart after FSEvents drops events.
 * Debounced to avoid rapid restart loops.
 */
const scheduleRestart = () => {
  if (restartTimeout) clearTimeout(restartTimeout);
  restartTimeout = setTimeout(() => {
    restartTimeout = null;
    console.info('[INFO] Restarting watcher after FSEvents drop...');
    startWatcher();
  }, 2000);
};

/**
 * Returns the unique top-level workspace directory segments from packageBuildOrder
 * (e.g. 'packages', 'apps', 'plugins') so we subscribe to a small number of roots
 * instead of one subscription per package. Fewer FSEvents streams = no queue overflow.
 *
 * @returns {string[]} Existing workspace root directories (relative to CWD)
 */
const getWatchRoots = () => {
  const roots = new Set();
  for (const pkg of packageBuildOrder) {
    const segment = normalizePath(pkg).split('/')[0];
    if (segment) roots.add(segment);
  }
  return [...roots].filter(existsSync);
};

/**
 * Starts the file watcher to monitor changes in the relevant packages.
 * Uses @parcel/watcher for native, high-performance file system watching —
 * one subscription per workspace root directory, filtered by extension in the callback.
 */
const startWatcher = async () => {
  if (subscriptions.length > 0) {
    console.info('[INFO] Restarting watcher...');
    await Promise.all(subscriptions.map((sub) => sub.unsubscribe()));
    subscriptions = [];
  }

  const { subscribe } = await import('@parcel/watcher');

  const watchRoots = getWatchRoots();
  console.info(
    `[INFO] Watching ${watchRoots.length} workspace roots (${watchRoots.join(', ')})...`
  );

  subscriptions = await Promise.all(
    watchRoots.map((root) =>
      subscribe(
        root,
        (err, events) => {
          if (err) {
            console.error('Watcher error:', err);
            scheduleRestart();
            return;
          }
          for (const event of events) {
            if (event.type !== 'create' && event.type !== 'update') continue;
            const p = normalizePath(event.path);
            if (!FILE_EXT_RE.test(p)) continue;
            const label = event.type === 'create' ? 'added' : 'changed';
            console.info(`[File ${label}] ${event.path}`);
            queueChange(event.path);
          }
        },
        { ignore: IGNORED_GLOBS }
      )
    )
  );

  console.info('Watching for changes...');
};

// Start the watcher initially
startWatcher();
