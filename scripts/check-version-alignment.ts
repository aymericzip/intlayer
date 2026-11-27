#!/usr/bin/env bun

/**
 * Blocks every release target (npm, crates.io, VS Code, Tauri, self-host) when
 * a released workspace drifts from the root version, e.g. `@intlayer/babel`
 * at 9.7.1 next to `intlayer` at 9.7.0.
 *
 * Usage: bun scripts/check-version-alignment.ts
 */

import { spawnSync } from 'node:child_process';
import { dirname } from 'node:path';
import { readWorkspacePackage, rootDirectory } from './npm-release-utils.ts';
import type { WorkspacePackage } from './npm-release-utils.ts';

/** Sample apps and build tooling follow their own version line. */
export const independentlyVersionedPatterns = ['examples/*', 'utils/*'];

/** Dependency fields that end up in published manifests. */
const publishedDependencyFields = [
  'dependencies',
  'peerDependencies',
  'optionalDependencies',
] as const;

/** Lists the tracked workspaces that ship with the root version. */
export const getReleasedWorkspaces = (): WorkspacePackage[] => {
  const workspaceGlobs = (readWorkspacePackage().workspaces ?? [])
    .map((pattern) => pattern.replace(/^\.\//, ''))
    .filter((pattern) => !independentlyVersionedPatterns.includes(pattern))
    .map((pattern) => new Bun.Glob(pattern));
  const result = spawnSync(
    'git',
    ['ls-files', '-z', '--', ':(glob)**/package.json'],
    { cwd: rootDirectory, encoding: 'utf8' }
  );

  if (result.status !== 0) {
    throw new Error(`Failed to list workspace manifests: ${result.stderr}`);
  }

  return result.stdout
    .split('\0')
    .filter(Boolean)
    .map((manifestPath) => dirname(manifestPath))
    .filter((directory) =>
      workspaceGlobs.some((workspaceGlob) => workspaceGlob.match(directory))
    )
    .map((directory) => readWorkspacePackage(directory));
};

/**
 * Returns one message per drifted workspace version, and per internal
 * dependency pinned to another version instead of the `workspace:` protocol.
 * Private workspaces without a version (showcase apps) are skipped.
 */
export const findVersionMisalignments = (
  workspaces: WorkspacePackage[],
  version: string
): string[] => {
  const workspaceNames = new Set(workspaces.map(({ name }) => name));

  return workspaces.flatMap((workspace) => {
    const label = `${workspace.name} (${workspace.directory})`;
    const isVersionAligned =
      workspace.version === version ||
      (!workspace.version && workspace.private === true);
    const versionMisalignments = isVersionAligned
      ? []
      : [
          `${label} is at ${workspace.version ?? 'no version'}, expected ${version}`,
        ];
    const dependencyMisalignments = publishedDependencyFields.flatMap((field) =>
      Object.entries(workspace[field] ?? {})
        .filter(
          ([dependencyName, specifier]) =>
            workspaceNames.has(dependencyName) &&
            !specifier.startsWith('workspace:') &&
            specifier !== version
        )
        .map(
          ([dependencyName, specifier]) =>
            `${label} pins ${field}.${dependencyName} to "${specifier}", use "workspace:*"`
        )
    );

    return [...versionMisalignments, ...dependencyMisalignments];
  });
};

if (import.meta.main) {
  const { version } = readWorkspacePackage();
  const workspaces = getReleasedWorkspaces();
  const misalignments = findVersionMisalignments(workspaces, version);

  if (misalignments.length > 0) {
    const prefix = process.env.GITHUB_ACTIONS ? '::error::' : '❌ ';

    for (const message of misalignments) {
      console.error(`${prefix}${message}`);
    }
    console.error(
      `Release blocked: ${misalignments.length} misalignment(s) with root version ${version}`
    );
    process.exit(1);
  }

  console.log(`✅ ${workspaces.length} workspaces aligned on ${version}`);
}
