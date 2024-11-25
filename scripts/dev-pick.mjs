// This script is used to start development mode for selected packages or apps.
// For performance reasons, it uses pnpm's --filter option to only start the selected packages, instead of starting all packages and apps.

import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import Enquirer from 'enquirer';
import fg from 'fast-glob';

const getPackages = (pattern, index) => {
  return fg.sync(pattern, { ignore: '**/node_modules/**' }).map((pkgPath) => {
    const packageJsonPath = `${pkgPath}`;
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    const packageRelativePath = path.relative(
      process.cwd(),
      path.dirname(packageJsonPath)
    );
    return {
      name: packageJson.name,
      value: `${index}:${packageRelativePath}`,
    };
  });
};

const apps = getPackages('./apps/**/package.json', 'app');
const packages = getPackages('./packages/**/package.json', 'packages');
const examples = getPackages('./examples/**/package.json', 'example');

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

const main = async () => {
  const selectedPackages = await askCheckboxPlus(
    'Select packages to start in development mode:',
    [
      { name: 'all apps', value: 'all_apps', choices: apps },
      { name: 'all packages', value: 'all_packages', choices: packages },
      { name: 'all examples', value: 'all_examples', choices: examples },
    ]
  );

  const selectedPackagesArray = Object.values(selectedPackages.selected);

  const isAllPackagesSelected = selectedPackagesArray.includes('all_packages');

  const isAllAppsSelected = selectedPackagesArray.includes('all_examples');

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

  const exampleFilters = isAllAppsSelected
    ? ['--filter "./examples"']
    : selectedPackagesArray
        .filter((app) => app.startsWith('example:'))
        .map((app) => `--filter "./${app.replace('example:', '')}"`);

  const command = `pnpm ${[...packageFilters, ...appFilters, ...exampleFilters].join(' ')} dev`;

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
