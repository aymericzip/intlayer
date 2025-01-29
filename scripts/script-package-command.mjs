#!/usr/bin/env node

/**
 * This script executes a specified npm command (default is 'dev') in each package
 * listed in the predefined `packageBuildOrder`. It runs the command in the specified order
 * and exits if any command fails. The script uses `spawnSync` to run the npm command and
 * logs each action in the process.
 *
 * You can specify a different command by using the `--command` argument.
 *
 * @module PackageCommandExecutor
 */

import { spawnSync } from 'child_process';
import process from 'process';
import minimist from 'minimist';
import { packageBuildOrder } from './package-build-order.mjs';

const args = minimist(process.argv.slice(2));
// Defaults to 'dev' if not provided
const chosenCommand = args.command ?? 'dev';

/**
 * Executes the given npm command on each package in the specified order.
 *
 * @param {string} command - The npm command to run (e.g., 'build', 'dev').
 * @param {Array<string>} [packages=packageBuildOrder] - The list of package paths to execute the command on.
 * @throws {Error} Will exit the process with an error status if any command fails.
 */
export const executeCommandOnPackages = (
  command,
  packages = packageBuildOrder
) => {
  console.info(
    `\nExecuting "${command}" on each package in specified order...\n`
  );

  for (const packagePath of packages) {
    console.info(`\n--- Running "${command}" in ${packagePath} ---\n`);
    const result = spawnSync('npm', ['run', command], {
      cwd: packagePath,
      stdio: 'inherit',
      shell: true,
    });

    if (result.status !== 0) {
      console.error(
        `\n[ERROR] Command "${command}" failed in ${packagePath}. Aborting.\n`
      );
      process.exit(result.status || 1);
    }
  }

  console.info(
    `\n[SUCCESS] Command "${command}" completed successfully for all packages.\n`
  );
};

/**
 * Main function to initiate the process.
 * It checks if the chosen command is specified and executes it on all packages.
 *
 * @throws {Error} Will exit the process with an error status if no command is provided.
 */
const main = () => {
  console.info(chosenCommand);
  if (!chosenCommand) {
    console.error('Please provide a command using --command=<yourCommand>');
    process.exit(1);
  }

  executeCommandOnPackages(chosenCommand);
};

main();
