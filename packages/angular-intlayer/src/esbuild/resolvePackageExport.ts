import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

/**
 * A target under a package manifest `exports` map: a file path, a condition
 * map, an ordered fallback list, or `null` to block the subpath.
 */
type ExportTarget =
  | string
  | null
  | ExportTarget[]
  | { [condition: string]: ExportTarget };

/** The subset of a `package.json` this resolution reads. */
type PackageManifest = {
  main?: string;
  module?: string;
  exports?: ExportTarget;
  sideEffects?: boolean | string[];
};

export type ResolvedPackageExport = {
  /** Absolute path of the file the specifier maps to. */
  path: string;
  /** `false` when the manifest declares the whole package side-effect free. */
  sideEffects: false | undefined;
};

/** Splits a bare specifier into its package name and `./`-prefixed subpath. */
export const parsePackageSpecifier = (
  specifier: string
): { packageName: string; subpath: string } => {
  const segments = specifier.split('/');
  const nameSegmentCount = specifier.startsWith('@') ? 2 : 1;
  const packageName = segments.slice(0, nameSegmentCount).join('/');
  const rest = segments.slice(nameSegmentCount).join('/');

  return { packageName, subpath: rest ? `./${rest}` : '.' };
};

/**
 * Locates `node_modules/<packageName>/package.json` the way Node does: from
 * `startDir` upward, first hit wins.
 */
export const findPackageManifest = (
  packageName: string,
  startDir: string
): string | undefined => {
  let currentDir = resolve(startDir);

  while (true) {
    const candidate = join(
      currentDir,
      'node_modules',
      packageName,
      'package.json'
    );
    if (existsSync(candidate)) return candidate;

    const parentDir = dirname(currentDir);
    if (parentDir === currentDir) return undefined;
    currentDir = parentDir;
  }
};

/**
 * Picks the file for a target, honouring the manifest's own key order for
 * condition maps as the ESM resolver does.
 */
const resolveExportTarget = (
  target: ExportTarget,
  conditions: ReadonlySet<string>
): string | undefined => {
  if (typeof target === 'string') return target;
  if (target === null) return undefined;

  if (Array.isArray(target)) {
    for (const candidate of target) {
      const resolved = resolveExportTarget(candidate, conditions);
      if (resolved) return resolved;
    }
    return undefined;
  }

  for (const [condition, value] of Object.entries(target)) {
    if (condition !== 'default' && !conditions.has(condition)) continue;

    const resolved = resolveExportTarget(value, conditions);
    if (resolved) return resolved;
  }

  return undefined;
};

/**
 * Matches `subpath` against the `exports` map: an exact key first, then the
 * `*` pattern with the longest literal prefix, substituting the wildcard into
 * the resolved target.
 */
const resolveSubpathExport = (
  exportsMap: ExportTarget,
  subpath: string,
  conditions: ReadonlySet<string>
): string | undefined => {
  const isSubpathMap =
    typeof exportsMap === 'object' &&
    exportsMap !== null &&
    !Array.isArray(exportsMap) &&
    Object.keys(exportsMap).some((key) => key.startsWith('.'));

  if (!isSubpathMap) {
    return subpath === '.'
      ? resolveExportTarget(exportsMap, conditions)
      : undefined;
  }

  const subpathMap = exportsMap as { [subpath: string]: ExportTarget };

  if (subpath in subpathMap) {
    return resolveExportTarget(subpathMap[subpath]!, conditions);
  }

  let bestMatch: { prefix: string; wildcard: string; target: ExportTarget } = {
    prefix: '',
    wildcard: '',
    target: null,
  };

  for (const [pattern, target] of Object.entries(subpathMap)) {
    const wildcardIndex = pattern.indexOf('*');
    if (wildcardIndex === -1) continue;

    const prefix = pattern.slice(0, wildcardIndex);
    const suffix = pattern.slice(wildcardIndex + 1);
    const matches =
      subpath.startsWith(prefix) &&
      subpath.length >= prefix.length + suffix.length &&
      subpath.endsWith(suffix);

    if (!matches || prefix.length <= bestMatch.prefix.length) continue;

    bestMatch = {
      prefix,
      wildcard: subpath.slice(prefix.length, subpath.length - suffix.length),
      target,
    };
  }

  const resolved = resolveExportTarget(bestMatch.target, conditions);

  return resolved?.replaceAll('*', bestMatch.wildcard);
};

/**
 * Resolves a bare specifier to an absolute file through the package manifest,
 * without going through the bundler's own resolver.
 *
 * Needed inside Angular's dev server: its esbuild pipeline marks every file
 * resolved under `node_modules` as external so Vite can pre-bundle it, and the
 * pre-bundler neither runs the Intlayer plugin nor sees its aliases — the real
 * `@intlayer/config/built` (a Node config loader) then lands in the browser.
 * Resolving here and returning a plain path keeps the package inside the
 * plugin-aware esbuild build.
 *
 * @param specifier - Bare specifier such as `@intlayer/core/interpreter`.
 * @param resolveDir - Directory the import is issued from.
 * @param conditions - Export conditions to honour, in addition to `default`.
 * @returns The resolved file, or `undefined` when the manifest cannot be found
 *   or does not map the subpath — the caller then leaves the bundler to it.
 */
export const resolvePackageExport = (
  specifier: string,
  resolveDir: string,
  conditions: readonly string[]
): ResolvedPackageExport | undefined => {
  const { packageName, subpath } = parsePackageSpecifier(specifier);
  const manifestPath = findPackageManifest(packageName, resolveDir);
  if (!manifestPath) return undefined;

  const manifest = JSON.parse(
    readFileSync(manifestPath, 'utf-8')
  ) as PackageManifest;
  const packageDir = dirname(manifestPath);
  const conditionSet = new Set(conditions);

  let target: string | undefined;

  if (manifest.exports !== undefined) {
    target = resolveSubpathExport(manifest.exports, subpath, conditionSet);
  } else if (subpath === '.') {
    target = manifest.module ?? manifest.main ?? './index.js';
  } else if (existsSync(join(packageDir, subpath))) {
    target = subpath;
  }

  if (!target) return undefined;

  return {
    path: resolve(packageDir, target),
    sideEffects: manifest.sideEffects === false ? false : undefined,
  };
};
