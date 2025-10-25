#!/usr/bin/env node

/**
 * This script allows the user to run a specified npm command (default is 'dev')
 * on selected packages, apps, or examples from a monorepo.
 * The user is prompted to choose items (apps, packages, or examples) through a multi-select prompt.
 * It constructs a command for the selected items and runs it using `bun`.
 * The script supports filtering specific directories or selecting "all" items.
 *
 * The script uses `fast-glob` for pattern matching, `enquirer` for interactive user prompts,
 * and `spawn` to execute commands in the shell.
 *
 * @module CommandExecutor
 */

import { spawn } from 'node:child_process';
import Enquirer from 'enquirer';
import fg from 'fast-glob';
import fs from 'node:fs';
import minimist from 'minimist';
import path from 'node:path';

const args = minimist(process.argv.slice(2));
// Defaults to 'dev' if not provided
const chosenCommand = args.command ?? 'dev';

/**
 * Normalizes a file path to use forward slashes, which is consistent across platforms.
 * @param {string} filePath - The file path to normalize.
 * @returns {string} The normalized file path.
 */
const normalizePath = (filePath) => filePath.replace(/\\/g, '/');

/**
 * Fetches packages from a given glob pattern.
 * Returns an array of objects with the name and relative path of each package.
 *
 * @param {string} pattern - Glob pattern to match package.json files.
 * @param {string} index - Index value used to prefix each package (e.g., 'app', 'package', 'example').
 * @returns {Array<Object>} Array of { name, value } objects for each package.
 */
const getPackages = (pattern, index) => {
  return fg.sync(pattern, { ignore: ['**/node_modules/**'] }).map((pkgPath) => {
    const packageJson = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    const packageRelativePath = path.relative(
      process.cwd(),
      path.dirname(pkgPath)
    );
    return {
      name: packageJson.name,
      value: `${index}:${normalizePath(packageRelativePath)}`,
    };
  });
};

const apps = getPackages('./apps/**/package.json', 'app');
const packages = getPackages('./packages/**/package.json', 'packages');
const examples = getPackages('./examples/**/package.json', 'example');

/**
 * Prompts the user to select items using a multiselect prompt.
 * Returns an object with the user's selection in the `.selected` property.
 *
 * @param {string} message - Message displayed in the prompt.
 * @param {Array<Object>} choices - Array of possible choices for the user to select.
 * @returns {Promise<Object>} Promise that resolves with the selected items.
 */
const askCheckboxPlus = (message, choices) => {
  return Enquirer.prompt({
    type: 'multiselect',
    name: 'selected',
    message: message,
    choices: choices,
    result(names) {
      return this.map(names);
    },
  });
};

/**
 * Main function that handles the logic of prompting the user, constructing the command,
 * and executing it on the selected packages, apps, or examples.
 */
const main = async () => {
  // Prompt user to pick from apps, packages, or examples
  const selectedPackages = await askCheckboxPlus(
    'Select items to start in mode: ' + chosenCommand,
    [
      { name: 'all apps', value: 'all_apps', choices: apps },
      { name: 'all packages', value: 'all_packages', choices: packages },
      { name: 'all examples', value: 'all_examples', choices: examples },
    ]
  );

  // Flatten the selected items from the user
  const selectedPackagesArray = Object.values(selectedPackages.selected);

  // Determine if user chose the "all" options
  const isAllAppsSelected = selectedPackagesArray.includes('all_apps');
  const isAllPackagesSelected = selectedPackagesArray.includes('all_packages');
  const isAllExamplesSelected = selectedPackagesArray.includes('all_examples');

  // Build filters for packages, apps, and examples
  const packageFilters = isAllPackagesSelected
    ? ['--filter "./packages"']
    : selectedPackagesArray
        .filter((pkg) => pkg.startsWith('packages:'))
        .map((pkg) => `--filter "./${pkg.replace('packages:', '')}"`);

  const appFilters = isAllAppsSelected
    ? ['--filter "./apps"']
    : selectedPackagesArray
        .filter((app) => app.startsWith('app:'))
        .map((app) => `--filter "./${app.replace('app:', '')}"`);

  const exampleFilters = isAllExamplesSelected
    ? ['--filter "./examples"']
    : selectedPackagesArray
        .filter((ex) => ex.startsWith('example:'))
        .map((ex) => `--filter "./${ex.replace('example:', '')}"`);

  // Construct the PNPM command, including chosen command
  const command = `bun ${[
    ...packageFilters,
    ...appFilters,
    ...exampleFilters,
  ].join(' ')} ${chosenCommand}`;

  console.info('->', command);

  // Execute the command
  const childProcess = spawn(command, { shell: true, stdio: 'inherit' });

  childProcess.on('error', (err) => {
    console.error('Failed to start command:', err);
  });

  childProcess.on('exit', (code) => {
    if (code !== 0) {
      console.error(`Command exited with code ${code}`);
    }
  });
};

main().catch((err) => console.error(err));
