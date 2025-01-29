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

import { spawnSync } from 'child_process';
import process from 'process';
import chokidar from 'chokidar';
import minimist from 'minimist';
import { packageBuildOrder } from './package-build-order.mjs';

const args = minimist(process.argv.slice(2));
const chosenCommand = args.command ?? 'build';

/**
 * Runs the chosen npm command in each relevant package, based on the file path.
 *
 * @param {string} path - The path to the file that triggered the event (change or add)
 * @throws {Error} Will throw an error if running the npm command fails
 */
const runBuild = (path) => {
  try {
    console.info(`\nDetected changes. Running "${chosenCommand}"...\n`);

    const filteredPackages = packageBuildOrder.filter((pkg) => {
      const pkgPath = path.startsWith(pkg) ? pkg : `${pkg}/`;
      return path.startsWith(pkgPath);
    });

    for (const pkg of filteredPackages) {
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
        continue; // Do not exit; just move to the next package
      }
    }
    console.info(`\n[SUCCESS] Command "${chosenCommand}" completed.\n`);
  } catch (err) {
    console.error('Failed to run build:', err);
  }
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

  watcher = chokidar.watch('**/*.{js,cjs,mjs,ts,jsx,tsx}', {
    ignoreInitial: true,
    ignored: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/.next/**',
      '**/.intlayer/**',
    ],
  });

  watcher.on('change', (path) => {
    console.info(`[File changed] ${path}`);
    runBuild(path);
  });

  watcher.on('add', (path) => {
    console.info(`[File added] ${path}`);
    runBuild(path);
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
