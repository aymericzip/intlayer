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
 * It uses `chokidar` for file system watching, `fast-glob` for fast file enumeration,
 * `spawnSync` for executing npm commands, and `minimist` for parsing command-line arguments.
 *
 * @module FileWatcher
 */

import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import process from 'node:process';
import chokidar from 'chokidar';
import fg from 'fast-glob';
import minimist from 'minimist';
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
      for (const pkg of filteredPackages) {
        packagesToRebuild.add(pkg);
      }
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

/**
 * Uses fast-glob to enumerate source files, then extracts unique parent directories.
 * Watching directories (not individual files) is what FSEvents/chokidar v5 is designed for.
 */
const getFilesToWatch = async () => {
  const validPkgs = packageBuildOrder.filter((pkg) => existsSync(pkg));
  const patterns = validPkgs.map(
    (pkg) => `${pkg}/**/*.{js,cjs,mjs,ts,jsx,tsx,vue,json,svelte}`
  );
  const files = await fg(patterns, { ignore: IGNORED_GLOBS, dot: false });

  return [...files];
};

let watcher;

/**
 * Starts the file watcher to monitor changes in the relevant files and directories.
 * Uses fast-glob to derive the set of directories to watch so chokidar never needs
 * to scan the full tree — it only watches leaf directories that actually contain
 * source files.
 */
const startWatcher = async () => {
  if (watcher) {
    console.info('[INFO] Restarting watcher...');
    await watcher.close();
  }

  console.info('[INFO] Scanning source files...');
  const files = await getFilesToWatch();
  console.info(`[INFO] Watching ${files.length} source directories...`);

  watcher = chokidar.watch(files, {
    persistent: true,
    ignoreInitial: true,
    awaitWriteFinish: {
      stabilityThreshold: 300,
      pollInterval: 100,
    },
    ignored: (filePath, stats) => {
      if (!stats?.isFile()) return false;
      const p = normalizePath(filePath);

      if (!FILE_EXT_RE.test(p)) return true;
      if (/tsup\.config\.bundled_/.test(p)) return true;
      if (/\.test\./.test(p)) return true;

      return false;
    },
  });

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
