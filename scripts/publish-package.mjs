#!/usr/bin/env node

/**
 * Publishes the package of the current working directory to npm through
 * **trusted publishing** (OIDC). Invoked by every workspace's `publish:ci`
 * script (through turbo) from the GitHub Actions `publish.yaml` workflow.
 *
 * The dist-tag is derived from the version unless `--tag` is given:
 * `9.0.0` → `latest`, `9.0.0-canary.0` → `canary`, `9.0.0-rc.1` → `rc`.
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
 * Usage: bun scripts/publish-package.mjs [--tag <dist-tag>] [--dry-run]
 * (`PUBLISH_DRY_RUN=true` also enables the dry run, for CI inputs.)
 */

import { spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { parseArgs } from 'node:util';

const { values: options } = parseArgs({
  options: {
    tag: { type: 'string' },
    'dry-run': { type: 'boolean', default: false },
  },
});

const packageDirectory = process.cwd();
const packageJson = JSON.parse(
  readFileSync(join(packageDirectory, 'package.json'), 'utf8')
);
const packageLabel = `${packageJson.name}@${packageJson.version}`;

const isDryRun = options['dry-run'] || process.env.PUBLISH_DRY_RUN === 'true';

/**
 * Picks the npm dist-tag matching a semver version: the first prerelease
 * identifier when there is one (`canary`, `beta`, `rc`...), `next` when the
 * prerelease is purely numeric, `latest` for a stable version.
 * @param {string} version
 * @returns {string}
 */
const getDistTagFromVersion = (version) => {
  const prerelease = /^\d+\.\d+\.\d+-([^.+]+)/.exec(version)?.[1];

  if (!prerelease) {
    return 'latest';
  }

  return /^\d+$/.test(prerelease) ? 'next' : prerelease;
};

const distTag = options.tag ?? getDistTagFromVersion(packageJson.version);

/** Messages npm prints when the version is already on the registry or currently staged. */
const republishPatterns = [
  /cannot publish over previously staged version/i,
  /cannot publish over the previously published versions/i,
  /cannot publish over previously published version/i,
  /previously staged version/i,
  /previously published version/i,
  /EPUBLISHCONFLICT/i,
  /code E409/i,
  /409 Conflict/i,
];

/** Non-retryable fatal errors where retrying will not help. */
const fatalPatterns = [
  /401 Unauthorized/i,
  /403 Forbidden/i,
  /400 Bad Request/i,
  /ENEEDAUTH/i,
];

/**
 * Checks if the given package version is already published on the registry.
 * @param {string} name
 * @param {string} version
 * @returns {Promise<boolean>}
 */
const isAlreadyPublished = async (name, version) => {
  try {
    const registry = (
      process.env.npm_config_registry || 'https://registry.npmjs.org'
    ).replace(/\/$/, '');
    const encodedName = name.startsWith('@')
      ? `@${encodeURIComponent(name.slice(1))}`
      : encodeURIComponent(name);
    const url = `${registry}/${encodedName}/${version}`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'intlayer-publish-script',
        Accept: 'application/json',
      },
    });
    return response.status === 200;
  } catch {
    return false;
  }
};

/**
 * Runs a command, streaming its output (unless `silent`) while keeping a copy
 * to inspect afterwards.
 * @param {string} command
 * @param {string[]} commandArguments
 * @param {{ silent?: boolean }} [runOptions]
 * @returns {{ status: number | null; stdout: string; output: string }}
 */
const run = (command, commandArguments, { silent = false } = {}) => {
  const result = spawnSync(command, commandArguments, {
    cwd: packageDirectory,
    encoding: 'utf8',
    env: process.env,
    stdio: ['inherit', 'pipe', 'pipe'],
  });

  if (!silent) {
    process.stdout.write(result.stdout ?? '');
    process.stderr.write(result.stderr ?? '');
  }

  return {
    status: result.status,
    stdout: result.stdout ?? '',
    output: `${result.stdout ?? ''}${result.stderr ?? ''}`,
  };
};

/**
 * npm swallows trusted-publishing failures (it silently falls back to the
 * configured token, and the registry then answers 404). The reason is only
 * written to the debug log, so surface its OIDC lines.
 * @param {string} output
 */
const printOidcDiagnostics = (output) => {
  const logPath = /complete log of this run can be found in:\s*(\S+)/.exec(
    output
  )?.[1];

  if (!logPath || !existsSync(logPath)) {
    return;
  }

  const oidcLines = readFileSync(logPath, 'utf8')
    .split('\n')
    .filter((line) => /oidc/i.test(line));

  if (oidcLines.length > 0) {
    console.error('🔎 OIDC trace from the npm debug log:');
    console.error(oidcLines.map((line) => `    ${line}`).join('\n'));
  }
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
    console.warn(`⚠️  ${packageLabel} is already published or staged, skipping`);
    return 0;
  }

  console.error(`❌ Failed to publish ${packageLabel}`);
  printOidcDiagnostics(output);
  return status ?? 1;
};

if (packageJson.private) {
  console.log(`⏭️  ${packageLabel} is private, skipping`);
  process.exit(0);
}

console.log(`📦 ${packageLabel} → tag "${distTag}"`);

// Pre-check the npm registry: if already published, skip packing and publishing immediately
if (
  !isDryRun &&
  (await isAlreadyPublished(packageJson.name, packageJson.version))
) {
  console.warn(`⚠️  ${packageLabel} is already published, skipping`);
  process.exit(0);
}

// Fail fast when the workflow lacks `permissions: id-token: write` or turbo
// strips the OIDC variables: npm would otherwise fail later with a 404.
if (
  process.env.GITHUB_ACTIONS === 'true' &&
  !(
    process.env.ACTIONS_ID_TOKEN_REQUEST_URL &&
    process.env.ACTIONS_ID_TOKEN_REQUEST_TOKEN
  )
) {
  console.error(
    '❌ ACTIONS_ID_TOKEN_REQUEST_URL / ACTIONS_ID_TOKEN_REQUEST_TOKEN are not set: trusted publishing cannot run'
  );
  process.exit(1);
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
 * @returns {Promise<number>} exit code
 */
const publish = async () => {
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

  const publishArguments = [
    'publish',
    tarballPath,
    '--access',
    'public',
    '--tag',
    distTag,
    '--ignore-scripts',
  ];

  if (isDryRun) {
    // npm performs the OIDC exchange even in dry-run mode, so a dry run is the
    // way to validate the trusted-publisher setup: run verbose and only report
    // the OIDC outcome instead of the whole trace.
    const dryRunResult = run(
      'npm',
      [...publishArguments, '--dry-run', '--loglevel=verbose'],
      { silent: true }
    );
    const oidcLines = dryRunResult.output
      .split('\n')
      .filter((line) => /oidc/i.test(line));

    console.log(
      oidcLines.length > 0
        ? oidcLines.map((line) => `    ${line}`).join('\n')
        : '    (no OIDC trace: not running on a supported CI)'
    );

    if (dryRunResult.status !== 0) {
      process.stderr.write(dryRunResult.output);
    }

    return toExitCode(dryRunResult);
  }

  const maxAttempts = 3;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const publishResult = run('npm', publishArguments);

    if (publishResult.status === 0) {
      return 0;
    }

    if (
      republishPatterns.some((pattern) => pattern.test(publishResult.output))
    ) {
      console.warn(
        `⚠️  ${packageLabel} is already published or staged on registry, skipping`
      );
      return 0;
    }

    if (attempt < maxAttempts) {
      console.warn(
        `⚠️  Publish attempt ${attempt} failed for ${packageLabel}. Checking registry...`
      );
      await new Promise((resolve) => setTimeout(resolve, 3000 * attempt));

      if (await isAlreadyPublished(packageJson.name, packageJson.version)) {
        console.warn(
          `⚠️  ${packageLabel} is now detected on registry, skipping`
        );
        return 0;
      }

      if (fatalPatterns.some((pattern) => pattern.test(publishResult.output))) {
        console.error(`❌ Non-retryable error encountered for ${packageLabel}`);
        break;
      }

      console.warn(
        `⚠️  Retrying publish for ${packageLabel} (${attempt + 1}/${maxAttempts})...`
      );
      continue;
    }

    console.error(`❌ Failed to publish ${packageLabel}`);
    printOidcDiagnostics(publishResult.output);
    return publishResult.status ?? 1;
  }

  return 1;
};

try {
  process.exitCode = await publish();
} finally {
  rmSync(tarballDirectory, { recursive: true, force: true });
}
