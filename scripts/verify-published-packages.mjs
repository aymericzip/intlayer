#!/usr/bin/env node

/**
 * Checks that every package released by the root `publish:ci` script is on
 * the npm registry at its current version. Run by the GitHub Actions
 * `publish.yaml` workflow after each publish pass: a package that failed to
 * publish makes this script exit with code 1 and lists it, so the workflow
 * can retry and, as a last resort, fail to be re-run.
 *
 * The package list is resolved with a turbo dry run using the `--filter`
 * arguments of the root `publish:ci` script, so both always target the same
 * set of packages.
 *
 * Usage: bun scripts/verify-published-packages.mjs
 */

import { spawnSync } from 'node:child_process';
import { appendFileSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const rootDirectory = join(import.meta.dirname, '..');

const registryUrl = (
  process.env.npm_config_registry || 'https://registry.npmjs.org'
).replace(/\/$/, '');

/**
 * Reads the `--filter` arguments of the root `publish:ci` script.
 * @returns {string[]}
 */
const getPublishFilters = () => {
  const rootPackageJson = JSON.parse(
    readFileSync(join(rootDirectory, 'package.json'), 'utf8')
  );
  const publishScript = rootPackageJson.scripts?.['publish:ci'] ?? '';

  return [...publishScript.matchAll(/'(--filter=[^']+)'/g)].map(
    ([, filter]) => filter
  );
};

/**
 * Lists the public packages whose `publish:ci` task turbo would run.
 * @returns {{ name: string; version: string }[]}
 */
const getPublishedPackages = () => {
  const result = spawnSync(
    'bun',
    ['turbo', 'run', 'publish:ci', ...getPublishFilters(), '--dry-run=json'],
    {
      cwd: rootDirectory,
      encoding: 'utf8',
      env: { ...process.env, TURBO_TELEMETRY_DISABLED: '1' },
      maxBuffer: 64 * 1024 * 1024,
    }
  );

  if (result.status !== 0) {
    process.stderr.write(result.stderr ?? '');
    throw new Error('Failed to resolve the packages to publish with turbo');
  }

  /** @type {{ tasks: { task: string; directory: string }[] }} */
  const dryRun = JSON.parse(result.stdout);

  return dryRun.tasks
    .filter(({ task }) => task === 'publish:ci')
    .map(({ directory }) =>
      JSON.parse(
        readFileSync(join(rootDirectory, directory, 'package.json'), 'utf8')
      )
    )
    .filter((packageJson) => !packageJson.private)
    .map(({ name, version }) => ({ name, version }));
};

/**
 * Checks whether `name@version` is available on the registry.
 * @param {{ name: string; version: string }} packageVersion
 * @returns {Promise<boolean>}
 */
const isPublished = async ({ name, version }) => {
  const encodedName = name.startsWith('@')
    ? `@${encodeURIComponent(name.slice(1))}`
    : encodeURIComponent(name);

  const maxAttempts = 3;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const response = await fetch(`${registryUrl}/${encodedName}/${version}`, {
        headers: {
          'User-Agent': 'intlayer-verify-published-packages',
          Accept: 'application/json',
        },
      });

      if (response.status === 200) {
        return true;
      }

      // A 404 is an answer: only network errors and 5xx are worth retrying.
      if (response.status < 500) {
        return false;
      }
    } catch {
      // Network error: retry below.
    }

    await new Promise((resolve) => setTimeout(resolve, 2000 * attempt));
  }

  return false;
};

const packages = getPublishedPackages();
const publicationStatuses = await Promise.all(
  packages.map(async (packageVersion) => ({
    ...packageVersion,
    published: await isPublished(packageVersion),
  }))
);
const missingPackages = publicationStatuses.filter(
  ({ published }) => !published
);

if (missingPackages.length === 0) {
  console.log(`✅ All ${packages.length} packages are published`);
  process.exit(0);
}

const missingList = missingPackages
  .map(({ name, version }) => `- ${name}@${version}`)
  .join('\n');

console.error(
  `❌ ${missingPackages.length}/${packages.length} packages are missing from the registry:\n${missingList}`
);

if (process.env.GITHUB_STEP_SUMMARY) {
  appendFileSync(
    process.env.GITHUB_STEP_SUMMARY,
    `### ❌ Packages missing from npm\n\n${missingList}\n`
  );
}

process.exit(1);
