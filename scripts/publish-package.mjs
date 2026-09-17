#!/usr/bin/env node

/**
 * Publishes the package of the current working directory to npm through
 * **trusted publishing** (OIDC). Invoked by every workspace's
 * `publish:latest:ci` script (through turbo) from the GitHub Actions
 * `publish.yaml` workflow.
 *
 * No npm token nor 2FA code is involved: GitHub mints a short-lived identity
 * token that `npm publish` exchanges for a single-use credential, and npm
 * generates the provenance attestation automatically.
 *
 * `npm publish` does not understand the `workspace:*` protocol, so the
 * tarball is first produced with `bun pm pack`, which rewrites those ranges
 * to concrete versions.
 *
 * Republishing an already published version is tolerated so that a partially
 * failed release can simply be re-run.
 *
 * Usage: bun scripts/publish-package.mjs [--tag latest] [--dry-run]
 * (`PUBLISH_DRY_RUN=true` also enables the dry run, for CI inputs.)
 */

import { spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { parseArgs } from 'node:util';

const { values: options } = parseArgs({
  options: {
    tag: { type: 'string', default: 'latest' },
    'dry-run': { type: 'boolean', default: false },
  },
});

const packageDirectory = process.cwd();
const packageJson = JSON.parse(
  readFileSync(join(packageDirectory, 'package.json'), 'utf8')
);
const packageLabel = `${packageJson.name}@${packageJson.version}`;

const isDryRun = options['dry-run'] || process.env.PUBLISH_DRY_RUN === 'true';

/** Messages npm prints when the version is already on the registry. */
const republishPatterns = [
  /cannot publish over the previously published versions/i,
  /EPUBLISHCONFLICT/,
];

/**
 * Runs a command, streaming its output while keeping a copy to inspect on
 * failure.
 * @param {string} command
 * @param {string[]} commandArguments
 * @returns {{ status: number | null; stdout: string; output: string }}
 */
const run = (command, commandArguments) => {
  const result = spawnSync(command, commandArguments, {
    cwd: packageDirectory,
    encoding: 'utf8',
    env: process.env,
    stdio: ['inherit', 'pipe', 'pipe'],
  });

  process.stdout.write(result.stdout ?? '');
  process.stderr.write(result.stderr ?? '');

  return {
    status: result.status,
    stdout: result.stdout ?? '',
    output: `${result.stdout ?? ''}${result.stderr ?? ''}`,
  };
};

/**
 * Converts the publish result into an exit code, downgrading a republish of
 * an existing version to a warning.
 * @param {{ status: number | null; output: string }} result
 * @returns {number}
 */
const toExitCode = ({ status, output }) => {
  if (status === 0) {
    return 0;
  }

  if (republishPatterns.some((pattern) => pattern.test(output))) {
    console.warn(`⚠️  ${packageLabel} is already published, skipping`);
    return 0;
  }

  console.error(`❌ Failed to publish ${packageLabel}`);
  return status ?? 1;
};

if (packageJson.private) {
  console.log(`⏭️  ${packageLabel} is private, skipping`);
  process.exit(0);
}

// `bun pm pack` never runs `prepublishOnly` (the swc wasm build relies on
// it), so run it explicitly and ignore lifecycle scripts afterwards.
if (packageJson.scripts?.prepublishOnly) {
  const prepublishResult = run('bun', ['run', 'prepublishOnly']);

  if (prepublishResult.status !== 0) {
    console.error(`❌ prepublishOnly failed for ${packageLabel}`);
    process.exit(prepublishResult.status ?? 1);
  }
}

const tarballDirectory = mkdtempSync(join(tmpdir(), 'intlayer-publish-'));

/**
 * Packs the package with bun (resolving `workspace:*`), then publishes the
 * tarball with npm so the OIDC exchange happens.
 * @returns {number} exit code
 */
const publish = () => {
  const packResult = run('bun', [
    'pm',
    'pack',
    '--quiet',
    '--ignore-scripts',
    '--destination',
    tarballDirectory,
  ]);

  if (packResult.status !== 0) {
    console.error(`❌ Failed to pack ${packageLabel}`);
    return packResult.status ?? 1;
  }

  // `--quiet` prints the absolute tarball path alone on stdout.
  const tarballPath = packResult.stdout.trim();

  if (!existsSync(tarballPath)) {
    console.error(`❌ Tarball not found for ${packageLabel}: ${tarballPath}`);
    return 1;
  }

  return toExitCode(
    run('npm', [
      'publish',
      tarballPath,
      '--access',
      'public',
      '--tag',
      options.tag,
      '--ignore-scripts',
      ...(isDryRun ? ['--dry-run'] : []),
    ])
  );
};

try {
  process.exitCode = publish();
} finally {
  rmSync(tarballDirectory, { recursive: true, force: true });
}
