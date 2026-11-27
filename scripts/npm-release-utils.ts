import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { basename, join, resolve } from 'node:path';

export type PackageVersion = { name: string; version: string };
export type ReleasePackage = PackageVersion & { tarball: string };
export type WorkspacePackage = PackageVersion & {
  directory: string;
  private?: boolean;
  scripts?: Record<string, string>;
  workspaces?: string[];
  dependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  optionalDependencies?: Record<string, string>;
};
export type ReleaseManifest = { version: string; packages: ReleasePackage[] };
export type RegistryOptions = {
  registryUrl?: string;
  fetchRequest?: (url: string, options: RequestInit) => Promise<Response>;
};

export const rootDirectory = join(import.meta.dirname, '..');

/** Reads a workspace manifest, resolving relative paths from the monorepo root. */
export const readWorkspacePackage = (
  directory = rootDirectory
): WorkspacePackage => ({
  ...JSON.parse(
    readFileSync(resolve(rootDirectory, directory, 'package.json'), 'utf8')
  ),
  directory,
});

/** Returns the registry used for both publication and verification. */
export const getRegistryUrl = () =>
  (
    process.env.npm_config_registry ??
    process.env.NPM_CONFIG_REGISTRY ??
    'https://registry.npmjs.org'
  ).replace(/\/$/, '');

/**
 * Keeps scoped names distinct: @intlayer/cli must not overwrite intlayer-cli.
 * @param {PackageVersion} packageVersion
 */
export const getReleaseTarballName = ({ name, version }: PackageVersion) =>
  `${encodeURIComponent(name)}-${version}.tgz`;

/** @param {string} version */
export const getDistTagFromVersion = (version: string) => {
  const prerelease = /^\d+\.\d+\.\d+-([^.+]+)/.exec(version)?.[1];
  return prerelease
    ? /^\d+$/.test(prerelease)
      ? 'next'
      : prerelease
    : 'latest';
};

/**
 * Resolves exactly the public workspaces targeted by the root publish:ci script.
 * @returns {(PackageVersion & { directory: string; scripts?: Record<string, string> })[]}
 */
export const getPublishedPackages = (
  turboPath?: string
): WorkspacePackage[] => {
  const publishScript = readWorkspacePackage().scripts?.['publish:ci:compile'];
  if (!publishScript) throw new Error('Missing root publish:ci:compile script');
  const filters = [...publishScript.matchAll(/'(--filter=[^']+)'/g)].map(
    ([, filter]) => filter!
  );
  const result = spawnSync(
    turboPath ?? 'bun',
    [
      ...(turboPath ? [] : ['turbo']),
      'run',
      'publish:ci',
      ...filters,
      '--dry-run=json',
    ],
    {
      cwd: rootDirectory,
      encoding: 'utf8',
      env: { ...process.env, TURBO_TELEMETRY_DISABLED: '1' },
      maxBuffer: 64 * 1024 * 1024,
    }
  );

  if (result.status !== 0) {
    throw new Error(`Failed to resolve release packages: ${result.stderr}`);
  }

  const dryRun = JSON.parse(result.stdout) as {
    tasks: { task: string; directory: string }[];
  };
  return dryRun.tasks
    .filter(({ task }) => task === 'publish:ci')
    .map(({ directory }) => readWorkspacePackage(directory))
    .filter((packageJson) => !packageJson.private);
};

/**
 * Rejects an empty release or inconsistent versions before touching npm.
 * @param {PackageVersion[]} packages
 * @param {string} version
 */
export const validateReleaseVersions = (
  packages: PackageVersion[],
  version: string
) => {
  if (packages.length === 0) {
    throw new Error('No public packages found for this release');
  }
  const names = new Set();
  for (const packageVersion of packages) {
    if (!packageVersion.name || packageVersion.version !== version) {
      throw new Error(
        `${packageVersion.name}@${packageVersion.version} must match release ${version}`
      );
    }
    if (names.has(packageVersion.name)) {
      throw new Error(`Duplicate release package: ${packageVersion.name}`);
    }
    names.add(packageVersion.name);
  }
};

/**
 * Reads the artifact manifest; publish jobs need neither dependencies nor builds.
 * @param {string} directory
 * @returns {{ version: string; packages: ReleasePackage[] }}
 */
export const readReleaseManifest = (directory: string): ReleaseManifest => {
  const manifest = JSON.parse(
    readFileSync(join(directory, 'manifest.json'), 'utf8')
  ) as ReleaseManifest;
  const { version } = readWorkspacePackage();
  if (manifest.version !== version) {
    throw new Error('Release artifact version does not match the checkout');
  }
  validateReleaseVersions(manifest.packages, version);
  const tarballs = new Set();
  for (const { tarball } of manifest.packages) {
    if (
      typeof tarball !== 'string' ||
      basename(tarball) !== tarball ||
      !tarball.endsWith('.tgz')
    ) {
      throw new Error(`Invalid release tarball: ${tarball}`);
    }
    if (tarballs.has(tarball)) {
      throw new Error(`Duplicate release tarball: ${tarball}`);
    }
    tarballs.add(tarball);
  }
  return manifest;
};

/** Only an authoritative registry answer can authorize a staging upload. */
export const canStageVersion = async (
  { name, version }: PackageVersion,
  { registryUrl = getRegistryUrl(), fetchRequest = fetch }: RegistryOptions = {}
): Promise<boolean> => {
  try {
    const response = await fetchRequest(
      `${registryUrl}/${encodeURIComponent(name)}`,
      {
        headers: {
          Accept: 'application/vnd.npm.install-v1+json',
          'Cache-Control': 'no-cache',
        },
        signal: AbortSignal.timeout(30_000),
      }
    );
    if (!response.ok) {
      await response.body?.cancel();
      return response.status === 404;
    }
    const metadata = (await response.json()) as {
      name?: string;
      versions?: Record<string, unknown>;
      'dist-tags'?: Record<string, string>;
    };
    return (
      metadata.name === name &&
      !!metadata.versions &&
      !!metadata['dist-tags'] &&
      metadata['dist-tags'].latest !== version &&
      !Object.hasOwn(metadata.versions, version)
    );
  } catch {
    return false;
  }
};

/**
 * Metadata alone is insufficient: installers also need the tarball to be available.
 * @param {PackageVersion} packageVersion
 * @param {{ registryUrl?: string; fetchRequest?: typeof fetch }} options
 */
export const isPublished = async (
  { name, version }: PackageVersion,
  { registryUrl = getRegistryUrl(), fetchRequest = fetch }: RegistryOptions = {}
) => {
  try {
    const response = await fetchRequest(
      `${registryUrl}/${encodeURIComponent(name)}/${version}`,
      {
        headers: { Accept: 'application/json', 'Cache-Control': 'no-cache' },
        signal: AbortSignal.timeout(30_000),
      }
    );
    if (!response.ok) {
      await response.body?.cancel();
      return false;
    }
    const metadata = (await response.json()) as {
      name?: string;
      version?: string;
      dist?: { tarball?: string };
    };
    if (
      metadata.name !== name ||
      metadata.version !== version ||
      !metadata.dist?.tarball
    ) {
      return false;
    }
    const tarballResponse = await fetchRequest(metadata.dist.tarball, {
      headers: { Range: 'bytes=0-0', 'Cache-Control': 'no-cache' },
      signal: AbortSignal.timeout(30_000),
    });
    await tarballResponse.body?.cancel();
    return tarballResponse.ok;
  } catch {
    return false;
  }
};

/**
 * Confirms that a successful npm command has propagated to the registry.
 * @param {PackageVersion} packageVersion
 * @param {string} tag
 */
export const isPromoted = async (
  { name, version }: PackageVersion,
  tag: string
) => {
  try {
    const response = await fetch(
      `${getRegistryUrl()}/-/package/${encodeURIComponent(name)}/dist-tags`,
      {
        headers: { 'Cache-Control': 'no-cache' },
        signal: AbortSignal.timeout(30_000),
      }
    );
    if (!response.ok) {
      await response.body?.cancel();
      return false;
    }
    const tags = (await response.json()) as Record<string, string>;
    return tags[tag] === version;
  } catch {
    return false;
  }
};

/**
 * Limits concurrent registry requests, especially for large documentation packages.
 * @template Item, Result
 * @param {Item[]} items
 * @param {(item: Item) => Promise<Result>} callback
 * @param {number} concurrency
 * @returns {Promise<Result[]>}
 */
export const mapConcurrent = async <Item, Result>(
  items: Item[],
  callback: (item: Item) => Promise<Result>,
  concurrency = 5
): Promise<Result[]> => {
  const results: Result[] = [];
  let nextIndex = 0;
  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, async () => {
      while (nextIndex < items.length) {
        const index = nextIndex++;
        results[index] = await callback(items[index]!);
      }
    })
  );
  return results;
};
