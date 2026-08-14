#!/usr/bin/env bun
/**
 * Turns a single monorepo workspace into a standalone, installable workspace
 * inside a Docker build.
 *
 * The Intlayer Docker images used to copy the whole monorepo and rebuild every
 * `@intlayer/*` package from source before the application itself could be
 * built. Every published `@intlayer/*` package already exists on the npm
 * registry, so the images can instead resolve them like any consumer does.
 *
 * This script performs the rewrites that make such an install possible:
 *
 * 1. In the target workspace manifest, every `workspace:` dependency range is
 *    replaced by a registry range (`latest` by default). Dependencies whose
 *    package is *not* published — the private `@utils/*` build configuration
 *    packages — keep their `workspace:` range and stay linked locally.
 * 2. A minimal workspace root manifest is written, declaring only the target
 *    workspace and the local packages, while preserving the resolution-affecting
 *    fields of the real root manifest (`resolutions`, `overrides`, …).
 *
 * `--drop` additionally removes dependencies a workspace only consumes for its
 * types, so the image never fetches their runtime dependency tree.
 *
 * The script is idempotent: running it again over an already-rewritten manifest
 * is a no-op, which lets a Dockerfile re-run it after copying the application
 * sources back over the manifest.
 *
 * @example
 * ```sh
 * bun docker/scripts/prepareStandaloneWorkspace.ts --workspace apps/backend
 * bun docker/scripts/prepareStandaloneWorkspace.ts --workspace apps/app --tag 9.3.2
 * bun docker/scripts/prepareStandaloneWorkspace.ts --workspace apps/app --drop @intlayer/backend
 * ```
 */

import { existsSync } from 'node:fs';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';

/** Manifest fields that can hold a `workspace:` range. */
const DEPENDENCY_FIELDS = [
  'dependencies',
  'devDependencies',
  'peerDependencies',
  'optionalDependencies',
] as const;

/**
 * Root manifest fields that influence dependency resolution and must survive
 * into the generated minimal root, so the image resolves the same versions the
 * monorepo does.
 */
const PRESERVED_ROOT_FIELDS = [
  'packageManager',
  'resolutions',
  'overrides',
  'patchedDependencies',
  'trustedDependencies',
] as const;

type DependencyField = (typeof DEPENDENCY_FIELDS)[number];

type PackageManifest = {
  name?: string;
  version?: string;
  private?: boolean;
  workspaces?: string[];
} & Partial<Record<DependencyField, Record<string, string>>> &
  Record<string, unknown>;

type PrepareOptions = {
  /** Absolute path of the workspace root inside the image. */
  rootDirectory: string;
  /** Root-relative path of the workspace to make standalone, e.g. `apps/backend`. */
  workspaceDirectory: string;
  /** Registry range substituted for published `workspace:` dependencies. */
  registryTag: string;
  /** Root-relative globs of workspaces that stay linked locally. */
  localWorkspaceGlobs: string[];
  /**
   * Dependencies removed from the manifest altogether. Reserved for packages a
   * workspace consumes for its types only: bundlers erase `import type`, so
   * fetching such a package — and its whole runtime dependency tree — would
   * cost build time without affecting the output.
   */
  droppedDependencies: string[];
};

/** Reads and parses a JSON manifest. */
const readManifest = async (path: string): Promise<PackageManifest> =>
  JSON.parse(await readFile(path, 'utf8')) as PackageManifest;

/** Writes a manifest back with the two-space indentation used across the repo. */
const writeManifest = async (
  path: string,
  manifest: PackageManifest
): Promise<void> => writeFile(path, `${JSON.stringify(manifest, null, 2)}\n`);

/**
 * Expands a single-level `<directory>/*` workspace glob into the manifest paths
 * that exist under `rootDirectory`. A glob without a wildcard is treated as a
 * literal workspace directory.
 */
const expandWorkspaceGlob = async (
  rootDirectory: string,
  globPattern: string
): Promise<string[]> => {
  if (!globPattern.includes('*')) return [join(globPattern, 'package.json')];

  const parentDirectory = dirname(globPattern);
  const absoluteParent = resolve(rootDirectory, parentDirectory);

  if (!existsSync(absoluteParent)) return [];

  const entries = await readdir(absoluteParent, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => join(parentDirectory, entry.name, 'package.json'))
    .filter((relativePath) => existsSync(resolve(rootDirectory, relativePath)));
};

/**
 * Collects the names of the workspaces that are present in the build context
 * and must keep being linked locally rather than fetched from the registry.
 */
const collectLocalWorkspaceNames = async (
  rootDirectory: string,
  localWorkspaceGlobs: string[]
): Promise<{ names: Set<string>; presentGlobs: string[] }> => {
  const names = new Set<string>();
  const presentGlobs: string[] = [];

  for (const globPattern of localWorkspaceGlobs) {
    const manifestPaths = await expandWorkspaceGlob(rootDirectory, globPattern);

    if (manifestPaths.length) presentGlobs.push(globPattern);

    for (const relativePath of manifestPaths) {
      const manifest = await readManifest(join(rootDirectory, relativePath));

      if (manifest.name) names.add(manifest.name);
    }
  }

  return { names, presentGlobs };
};

/**
 * Replaces published `workspace:` ranges by `registryTag`, leaving the ranges of
 * locally present workspaces untouched.
 *
 * @returns The names that were rewritten, for logging.
 */
const rewriteWorkspaceRanges = (
  manifest: PackageManifest,
  localWorkspaceNames: Set<string>,
  registryTag: string
): string[] => {
  const rewrittenNames: string[] = [];

  for (const field of DEPENDENCY_FIELDS) {
    const dependencies = manifest[field];

    if (!dependencies) continue;

    for (const [dependencyName, range] of Object.entries(dependencies)) {
      if (!range.startsWith('workspace:')) continue;
      if (localWorkspaceNames.has(dependencyName)) continue;

      dependencies[dependencyName] = registryTag;
      rewrittenNames.push(dependencyName);
    }
  }

  return rewrittenNames;
};

/**
 * Removes the given dependencies from every dependency field.
 *
 * @returns The names that were actually present and removed, for logging.
 */
const dropDependencies = (
  manifest: PackageManifest,
  droppedDependencies: string[]
): string[] => {
  const removedNames: string[] = [];

  for (const field of DEPENDENCY_FIELDS) {
    const dependencies = manifest[field];

    if (!dependencies) continue;

    for (const dependencyName of droppedDependencies) {
      if (!(dependencyName in dependencies)) continue;

      delete dependencies[dependencyName];
      removedNames.push(dependencyName);
    }
  }

  return removedNames;
};

/**
 * Builds the minimal workspace root manifest. Scripts and development
 * dependencies of the real root (turbo, biome, changesets, …) are dropped: the
 * image builds a single workspace and never runs them.
 */
const buildMinimalRootManifest = (
  currentRootManifest: PackageManifest | null,
  workspaceDirectory: string,
  localWorkspaceGlobs: string[]
): PackageManifest => {
  const minimalRootManifest: PackageManifest = {
    name: 'intlayer-standalone-workspace',
    private: true,
    workspaces: [workspaceDirectory, ...localWorkspaceGlobs],
  };

  for (const field of PRESERVED_ROOT_FIELDS) {
    const value = currentRootManifest?.[field];

    if (value !== undefined) minimalRootManifest[field] = value;
  }

  return minimalRootManifest;
};

/** Parses `--flag value` pairs into a lookup. */
const parseArguments = (argv: string[]): Record<string, string> => {
  const parsedArguments: Record<string, string> = {};

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];

    if (!argument.startsWith('--')) continue;

    parsedArguments[argument.slice(2)] = argv[index + 1] ?? '';
    index += 1;
  }

  return parsedArguments;
};

/** Applies the rewrites and reports what changed. */
export const prepareStandaloneWorkspace = async ({
  rootDirectory,
  workspaceDirectory,
  registryTag,
  localWorkspaceGlobs,
  droppedDependencies,
}: PrepareOptions): Promise<void> => {
  const manifestPath = resolve(
    rootDirectory,
    workspaceDirectory,
    'package.json'
  );

  if (!existsSync(manifestPath))
    throw new Error(`No package.json found at ${manifestPath}`);

  const { names: localWorkspaceNames, presentGlobs: presentLocalGlobs } =
    await collectLocalWorkspaceNames(rootDirectory, localWorkspaceGlobs);

  const manifest = await readManifest(manifestPath);
  const removedNames = dropDependencies(manifest, droppedDependencies);
  const rewrittenNames = rewriteWorkspaceRanges(
    manifest,
    localWorkspaceNames,
    registryTag
  );

  await writeManifest(manifestPath, manifest);

  const rootManifestPath = resolve(rootDirectory, 'package.json');
  const currentRootManifest = existsSync(rootManifestPath)
    ? await readManifest(rootManifestPath)
    : null;

  await writeManifest(
    rootManifestPath,
    buildMinimalRootManifest(
      currentRootManifest,
      workspaceDirectory,
      presentLocalGlobs
    )
  );

  console.log(
    `[prepare-standalone-workspace] ${workspaceDirectory}: ` +
      `${rewrittenNames.length} dependencies pinned to "${registryTag}"` +
      (rewrittenNames.length ? ` (${rewrittenNames.join(', ')})` : '')
  );

  if (localWorkspaceNames.size)
    console.log(
      `[prepare-standalone-workspace] local workspaces (never fetched): ${[...localWorkspaceNames].join(', ')}`
    );

  if (removedNames.length)
    console.log(
      `[prepare-standalone-workspace] dropped (types-only): ${removedNames.join(', ')}`
    );
};

if (import.meta.main) {
  const parsedArguments = parseArguments(process.argv.slice(2));

  await prepareStandaloneWorkspace({
    rootDirectory: parsedArguments.root ?? process.cwd(),
    workspaceDirectory: parsedArguments.workspace ?? '',
    registryTag: parsedArguments.tag ?? 'latest',
    localWorkspaceGlobs: (parsedArguments.local ?? 'utils/*').split(','),
    droppedDependencies: parsedArguments.drop
      ? parsedArguments.drop.split(',')
      : [],
  });
}
