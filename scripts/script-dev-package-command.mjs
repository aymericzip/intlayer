#!/usr/bin/env node

/**
 * This script watches for changes in JavaScript, TypeScript, and related files
 * (such as .jsx, .tsx) in the current directory and its subdirectories.
 * When a file is changed or added, it triggers a specified npm command (default is 'build')
 * in each relevant package based on the file path.
 *
 * The command can be customized with the --command flag. It runs the command in each package
 * listed in the `packageBuildOrder`, a predefined array of package paths.
 * The script continues to run even if one of the commands fails, and logs all activity.
 *
 * It uses `chokidar` for file system watching, `spawnSync` for executing npm commands,
 * and `minimist` for parsing command-line arguments.
 *
 * @module FileWatcher
 */

import { spawnSync } from 'node:child_process';
import chokidar from 'chokidar';
import minimist from 'minimist';
import process from 'process';
import { packageBuildOrder } from './package-build-order.mjs';

const args = minimist(process.argv.slice(2));
const chosenCommand = args.command ?? 'build';

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
 * Runs the chosen npm command in each relevant package, based on the file path.
 *
 * @param {string} path - The path to the file that triggered the event (change or add)
 * @throws {Error} Will throw an error if running the npm command fails
 */
const runBuild = (paths) => {
  try {
    console.info(
      `\nDetected changes in ${paths.size} files. Running "${chosenCommand}"...\n`
    );

    // Get unique packages that need to be rebuilt
    const packagesToRebuild = new Set();
    for (const path of paths) {
      const normalizedPath = normalizePath(path);
      const filteredPackages = packageBuildOrder.filter((pkg) => {
        const normalizedPkg = normalizePath(pkg);
        const pkgPath = normalizedPkg.endsWith('/')
          ? normalizedPkg
          : `${normalizedPkg}/`;
        return normalizedPath.startsWith(pkgPath);
      });
      filteredPackages.forEach((pkg) => {
        packagesToRebuild.add(pkg);
      });
    }

    for (const pkg of packagesToRebuild) {
      console.info(`\n--- Running "${chosenCommand}" in ${pkg} ---\n`);
      const result = spawnSync('npm', ['run', chosenCommand], {
        cwd: pkg,
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

let watcher;

/**
 * Starts the file watcher to monitor changes in the relevant files and directories.
 * It listens for changes, additions, or errors, and triggers the build process when
 * necessary. This function also manages restarting the watcher if needed.
 */
const startWatcher = () => {
  if (watcher) {
    console.info('[INFO] Restarting watcher...');
    watcher.close(); // Close existing watcher before starting a new one
  }

  watcher = chokidar.watch(
    '**/*.{js,cjs,mjs,ts,jsx,tsx,vue,json,md,yml,yaml,svelte}',
    {
      ignoreInitial: true,
      ignored: [
        'examples/**',
        '**/node_modules/**',
        '**/dist/**',
        '**/build/**',
        '**/.next/**',
        '**/*.svelte-kit/**',
        '**/.intlayer/**',
        '**/tsup.config.bundled_*.mjs',
        '**/*.test.*',
      ],
    }
  );

  watcher.on('change', (path) => {
    console.info(`[File changed] ${path}`);
    queueChange(path);
  });

  watcher.on('add', (path) => {
    console.info(`[File added] ${path}`);
    queueChange(path);
  });

  watcher.on('error', (error) => {
    console.error('Watcher error:', error);
  });

  watcher.on('ready', () => {
    console.info('Initial scan complete. Watching for changes...');
  });
};

// Start the watcher initially
startWatcher();
