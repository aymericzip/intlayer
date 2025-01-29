#!/usr/bin/env node

/**
 * This script identifies the changed files between the current git HEAD and the main branch,
 * and then determines which packages are affected by those changes based on the predefined
 * `packageBuildOrder`. It runs a specified npm command (default is 'build') in each affected package
 * in the defined build order. The script exits if there are no changes or if any command fails.
 *
 * The script utilizes `git diff` to detect file changes and runs npm commands using `spawnSync`.
 * The `--command` argument can be used to specify a different npm command to run in the affected packages.
 *
 * @module GitFileWatcher
 */

import { spawnSync } from 'child_process';
import process from 'process';
import minimist from 'minimist';
import { packageBuildOrder } from './package-build-order.mjs'; // Your build order

const args = minimist(process.argv.slice(2));

// Default command is 'build' if not provided
const chosenCommand = args.command ?? 'build';

/**
 * Gets the list of changed files between the current HEAD and the main branch.
 * It uses `git diff` to retrieve the list of changed files.
 * If the command fails, the process exits with an error status.
 *
 * @returns {Array<string>} List of changed files.
 * @throws {Error} Will throw an error if the `git diff` command fails.
 */
const getChangedFiles = () => {
  const diffResult = spawnSync('git', ['diff', '--name-only', 'HEAD', 'main'], {
    stdio: ['pipe', 'pipe', 'inherit'],
  });

  if (diffResult.status !== 0) {
    console.error('Failed to get changed files from git. Aborting.');
    process.exit(diffResult.status || 1);
  }

  return diffResult.stdout.toString().split('\n').filter(Boolean);
};

// 1) Get changed files from Git
const changedFiles = getChangedFiles();

if (!changedFiles.length) {
  console.info('No files changed. Nothing to build.');
  process.exit(0);
}

// 2) Determine which packages have changed files
const changedPackagesSet = new Set();
for (const filePath of changedFiles) {
  for (const packagePath of packageBuildOrder) {
    // If the changed file is inside the package folder
    // Adjust the condition to your folder structure as necessary
    if (filePath.startsWith(packagePath)) {
      changedPackagesSet.add(packagePath);
    }
  }
}

const changedPackages = packageBuildOrder.filter((pkg) =>
  changedPackagesSet.has(pkg)
);

if (!changedPackages.length) {
  console.info('No changed packages found within build order. Exiting.');
  process.exit(0);
}

// 3) Run the chosen command in each changed package, respecting build order
for (const pkg of changedPackages) {
  console.info(`\n--- Running "${chosenCommand}" in ${pkg} ---\n`);
  const result = spawnSync('npm', ['run', chosenCommand], {
    cwd: pkg,
    stdio: 'inherit',
    shell: true,
  });

  if (result.status !== 0) {
    console.error(
      `\n[ERROR] Command "${chosenCommand}" failed in ${pkg}. Aborting.\n`
    );
    process.exit(result.status ?? 1);
  }
}

console.info(
  `\n[SUCCESS] Command "${chosenCommand}" completed successfully for changed packages.\n`
);
