#!/usr/bin/env bun

import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { parseArgs } from 'node:util';
import { readWorkspacePackage } from './npm-release-utils.ts';
import type { WorkspacePackage } from './npm-release-utils.ts';
import {
  getPublishedPackages,
  getReleaseTarballName,
  rootDirectory,
  validateReleaseVersions,
} from './npm-release-utils.ts';

/** Builds lifecycle assets once and writes a publishable Bun archive. */
export const packWorkspace = (
  packageJson: WorkspacePackage,
  directory: string
) => {
  const packageDirectory = resolve(rootDirectory, packageJson.directory);
  // In particular, build the SWC wasm once, before uploading the artifact.
  if (packageJson.scripts?.prepublishOnly) {
    const result = spawnSync('bun', ['run', 'prepublishOnly'], {
      cwd: packageDirectory,
      stdio: 'inherit',
    });
    if (result.status !== 0) {
      throw new Error(`prepublishOnly failed for ${packageJson.name}`);
    }
  }
  const tarball = getReleaseTarballName(packageJson);
  const tarballPath = join(directory, tarball);
  const result = spawnSync(
    'bun',
    ['pm', 'pack', '--quiet', '--ignore-scripts', '--filename', tarballPath],
    { cwd: packageDirectory, encoding: 'utf8' }
  );
  if (result.status !== 0 || !existsSync(tarballPath)) {
    throw new Error(`Packing failed for ${packageJson.name}: ${result.stderr}`);
  }
  console.log(`📦 ${packageJson.name}@${packageJson.version}`);
  return {
    name: packageJson.name,
    version: packageJson.version,
    tarball,
  };
};

/**
 * Builds lifecycle assets and packs every workspace before creating a manifest.
 * @param {{ packages: ReturnType<typeof getPublishedPackages>; version: string; directory: string }} options
 */
export const prepareNpmRelease = ({
  packages,
  version,
  directory,
}: {
  packages: WorkspacePackage[];
  version: string;
  directory: string;
}) => {
  validateReleaseVersions(packages, version);
  mkdirSync(directory, { recursive: true });
  rmSync(join(directory, 'manifest.json'), { force: true });
  const releasePackages = packages.map((workspace) =>
    packWorkspace(workspace, directory)
  );
  // Written last: a partial preparation can never be published.
  writeFileSync(
    join(directory, 'manifest.json'),
    JSON.stringify({ version, packages: releasePackages }, null, 2)
  );
};

if (import.meta.main) {
  const { values: options } = parseArgs({
    options: {
      check: { type: 'boolean', default: false },
      directory: { type: 'string', default: '.npm-release' },
    },
  });
  const packages = getPublishedPackages();
  const { version } = readWorkspacePackage();
  validateReleaseVersions(packages, version);
  console.log(`✅ ${packages.length} packages at version ${version}`);
  if (!options.check) {
    prepareNpmRelease({
      packages,
      version,
      directory: resolve(options.directory),
    });
  }
}
