#!/usr/bin/env node

/**
 * Registers the GitHub Actions `publish.yaml` workflow as a **trusted
 * publisher** (OIDC) of every public workspace package on npm, so
 * `scripts/publish-package.mjs` can publish without any npm token.
 *
 * Mirrors the manual one-time setup documented at the top of
 * `.github/workflows/publish.yaml`, running for each package:
 *
 *   npm trust github <name> --repo aymericzip/intlayer --file publish.yaml \
 *     --env npm --allow-publish --yes
 *
 * Packages that already have a trust configuration are skipped, so the script
 * can be re-run whenever a package is added. npm asks for web authentication
 * (2FA) when needed; follow the link it prints.
 *
 * Usage: bun scripts/trust-packages.mjs [--filter <substring>] [--dry-run]
 *        [--repo <owner/repo>] [--file <workflow>] [--env <environment>]
 */

import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import fg from 'fast-glob';

const { values: options } = parseArgs({
  options: {
    repo: { type: 'string', default: 'aymericzip/intlayer' },
    file: { type: 'string', default: 'publish.yaml' },
    env: { type: 'string', default: 'npm' },
    filter: { type: 'string' },
    'dry-run': { type: 'boolean', default: false },
  },
});

const rootDirectory = join(dirname(fileURLToPath(import.meta.url)), '..');

/**
 * Workspaces covered by the root `publish:ci` script. Keep in sync with the
 * `--filter` list of that script in the root `package.json`.
 */
const PUBLISHED_WORKSPACE_PATTERNS = [
  'packages/**/package.json',
  'docs/package.json',
  'apps/backend/package.json',
  'plugins/**/package.json',
  'compat/**/package.json',
];

/**
 * Lists the public packages that `publish:ci` publishes: every workspace of
 * the published globs that is not private and defines a `publish:ci` script.
 * @returns {{ name: string; directory: string }[]}
 */
const listPublishedPackages = () => {
  const manifestPaths = fg.sync(PUBLISHED_WORKSPACE_PATTERNS, {
    cwd: rootDirectory,
    ignore: ['**/node_modules/**', '**/dist/**'],
    absolute: true,
  });

  return manifestPaths
    .map((manifestPath) => {
      const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));

      return {
        name: manifest.name,
        directory: relative(rootDirectory, dirname(manifestPath)),
        isPublished:
          manifest.private !== true &&
          typeof manifest.scripts?.['publish:ci'] === 'string',
      };
    })
    .filter(({ isPublished }) => isPublished)
    .filter(({ name }) => !options.filter || name.includes(options.filter))
    .sort((left, right) => left.name.localeCompare(right.name));
};

/**
 * Runs an npm command, letting the user interact with npm's authentication
 * prompts (stdin/stderr are inherited) while capturing stdout for inspection.
 * @param {string[]} args
 * @returns {{ status: number | null; stdout: string }}
 */
const runNpm = (args) => {
  const result = spawnSync('npm', args, {
    cwd: rootDirectory,
    stdio: ['inherit', 'pipe', 'inherit'],
    encoding: 'utf8',
  });

  return { status: result.status, stdout: result.stdout ?? '' };
};

/**
 * Whether the package already has at least one trust configuration on npm.
 * @param {string} packageName
 * @returns {boolean}
 */
const isAlreadyTrusted = (packageName) => {
  const { status, stdout } = runNpm(['trust', 'list', packageName]);

  if (status !== 0) {
    throw new Error(`npm trust list failed for ${packageName}`);
  }

  return !stdout.includes('No trust configurations found');
};

/**
 * Creates the GitHub Actions trust configuration of a package.
 * @param {string} packageName
 */
const trustPackage = (packageName) => {
  const args = [
    'trust',
    'github',
    packageName,
    '--repo',
    options.repo,
    '--file',
    options.file,
    '--env',
    options.env,
    '--allow-publish',
    '--yes',
  ];

  if (options['dry-run']) {
    console.log(`  [dry-run] npm ${args.join(' ')}`);
    return;
  }

  const { status, stdout } = runNpm(args);
  process.stdout.write(stdout);

  if (status !== 0) {
    throw new Error(`npm trust github failed for ${packageName}`);
  }
};

const packages = listPublishedPackages();

console.log(
  `Trusting ${options.repo}/${options.file} (environment "${options.env}") ` +
    `for ${packages.length} package(s)\n`
);

/** @type {{ trusted: string[]; skipped: string[]; failed: string[] }} */
const report = { trusted: [], skipped: [], failed: [] };

for (const { name, directory } of packages) {
  console.log(`→ ${name} (${directory})`);

  try {
    if (isAlreadyTrusted(name)) {
      console.log('  already trusted, skipped');
      report.skipped.push(name);
      continue;
    }

    trustPackage(name);
    report.trusted.push(name);
  } catch (error) {
    console.error(`  ${error instanceof Error ? error.message : error}`);
    report.failed.push(name);
  }
}

console.log(
  `\nDone: ${report.trusted.length} trusted, ${report.skipped.length} skipped, ` +
    `${report.failed.length} failed`
);

if (report.failed.length > 0) {
  console.error(`Failed: ${report.failed.join(', ')}`);
  process.exit(1);
}
