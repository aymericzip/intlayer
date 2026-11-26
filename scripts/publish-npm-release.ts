#!/usr/bin/env bun

import { spawn } from 'node:child_process';
import { appendFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { setTimeout } from 'node:timers/promises';
import { parseArgs } from 'node:util';
import type { PackageVersion } from './npm-release-utils.ts';
import {
  canStageVersion,
  getDistTagFromVersion,
  getRegistryUrl,
  isPromoted,
  isPublished,
  mapConcurrent,
  readReleaseManifest,
} from './npm-release-utils.ts';

/**
 * Runs npm without invoking build, pack, or package lifecycle scripts.
 * @param {string[]} commandArguments
 * @returns {Promise<boolean>}
 */
const runNpm = (commandArguments: string[]): Promise<boolean> =>
  new Promise((resolveResult) => {
    const child = spawn('npm', commandArguments, { stdio: 'inherit' });
    child.on('error', () => resolveResult(false));
    child.on('close', (code) => resolveResult(code === 0));
  });

type PublishReleaseOptions = {
  phase: 'staging' | 'promote';
  directory: string;
  dryRun?: boolean;
  maxAttempts?: number;
  retryDelayMilliseconds?: number;
  executeNpm?: (commandArguments: string[]) => Promise<boolean>;
  canStage?: (packageVersion: PackageVersion) => Promise<boolean>;
  checkPublished?: (packageVersion: PackageVersion) => Promise<boolean>;
  checkPromoted?: (
    packageVersion: PackageVersion,
    tag: string
  ) => Promise<boolean>;
  wait?: (milliseconds: number) => Promise<void>;
};

/** Publishes prepared archives and promotes a fully available release. */
export const publishNpmRelease = async ({
  phase,
  directory,
  dryRun = false,
  maxAttempts = 20,
  retryDelayMilliseconds = 30_000,
  executeNpm = runNpm,
  canStage = canStageVersion,
  checkPublished = isPublished,
  checkPromoted = isPromoted,
  wait = setTimeout,
}: PublishReleaseOptions) => {
  const { version, packages } = readReleaseManifest(directory);
  const targetTag = getDistTagFromVersion(version);
  const registryArguments = ['--registry', getRegistryUrl()];
  for (const { tarball } of packages) {
    if (!existsSync(join(directory, tarball))) {
      throw new Error(`Missing prepared archive: ${tarball}`);
    }
  }

  /** Checks every package with bounded concurrency. */
  const getMissingPackages = async () => {
    const statuses = await mapConcurrent(packages, checkPublished);
    return packages.filter((_, index) => !statuses[index]);
  };

  // A separate promotion job can be retried without republishing anything.
  if (phase === 'promote' && !dryRun) {
    const missing = await getMissingPackages();
    if (missing.length > 0) {
      throw new Error(
        `Promotion blocked: ${missing.map(({ name }) => name).join(', ')} unavailable`
      );
    }
  }

  let pending = packages;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    console.log(`🚀 ${phase}: attempt ${attempt}/${maxAttempts}`);
    const results = await mapConcurrent(pending, async (packageVersion) => {
      const packageLabel = `${packageVersion.name}@${version}`;
      if (phase === 'promote') {
        if (!dryRun && (await checkPromoted(packageVersion, targetTag))) {
          return true;
        }
        console.log(
          `${dryRun ? '[dry-run] ' : ''}${packageLabel} → ${targetTag}`
        );
        return dryRun
          ? true
          : executeNpm([
              'dist-tag',
              'add',
              packageLabel,
              targetTag,
              ...registryArguments,
            ]);
      }
      if (!dryRun && !(await canStage(packageVersion))) {
        console.log(
          `⏭️ ${packageLabel} skipping upload until the registry confirms this version is missing`
        );
        return true;
      }
      return executeNpm([
        'publish',
        join(directory, packageVersion.tarball),
        '--access',
        'public',
        '--tag',
        'staging',
        '--ignore-scripts',
        ...registryArguments,
        ...(dryRun ? ['--dry-run'] : []),
      ]);
    });
    if (phase === 'staging' && !dryRun) {
      pending = await getMissingPackages();
    } else if (phase === 'promote' && !dryRun) {
      // Check all tags even on reruns: an earlier attempt may have stopped midway.
      const statuses = await mapConcurrent(packages, (packageVersion) =>
        checkPromoted(packageVersion, targetTag)
      );
      pending = packages.filter((_, index) => !statuses[index]);
    } else {
      pending = pending.filter((_, index) => !results[index]);
    }

    if (pending.length === 0) {
      console.log(`✅ ${phase} complete for all ${packages.length} packages`);
      return;
    }
    console.warn(
      `⚠️ Still pending: ${pending.map(({ name }) => name).join(', ')}`
    );
    if (attempt < maxAttempts) {
      console.log(
        `Waiting ${retryDelayMilliseconds / 1000}s before retrying...`
      );
      await wait(retryDelayMilliseconds);
    }
  }

  const missingList = pending
    .map(({ name }) => `- ${name}@${version}`)
    .join('\n');
  if (process.env.GITHUB_STEP_SUMMARY) {
    appendFileSync(
      process.env.GITHUB_STEP_SUMMARY,
      `### ❌ npm ${phase} incomplete after ${maxAttempts} attempts\n\n${missingList}\n`
    );
  }
  throw new Error(
    `npm ${phase} failed after ${maxAttempts} attempts:\n${missingList}`
  );
};

if (import.meta.main) {
  const { values: options } = parseArgs({
    options: {
      phase: { type: 'string' },
      directory: { type: 'string', default: '.npm-release' },
      'dry-run': { type: 'boolean', default: false },
    },
  });
  if (options.phase !== 'staging' && options.phase !== 'promote') {
    throw new Error('--phase must be staging or promote');
  }
  await publishNpmRelease({
    phase: options.phase,
    directory: resolve(options.directory),
    dryRun: options['dry-run'] || process.env.PUBLISH_DRY_RUN === 'true',
  });
}
