import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { EXCLUDED_PATHS } from '@intlayer/config/defaultValues';
import fg from 'fast-glob';
import { isIntlayerPackageName, normalizeVersion } from './packageManager';

/** Dependency fields of a `package.json` scanned for Intlayer packages. */
const DEPENDENCY_FIELDS = ['dependencies', 'devDependencies'] as const;

type DependencyField = (typeof DEPENDENCY_FIELDS)[number];

/** An Intlayer dependency declared in one of the project's `package.json`. */
export type IntlayerDependency = {
  /** Package name, e.g. `next-intlayer`. */
  packageName: string;
  /** Field the dependency is declared in. */
  dependencyField: DependencyField;
  /** Declared version range, e.g. `^9.5.0`. */
  currentRange: string;
};

/** Intlayer dependencies of one `package.json`. */
export type PackageJsonIntlayerDependencies = {
  /** Path of the `package.json`, relative to the project root. */
  packageJsonPath: string;
  dependencies: IntlayerDependency[];
};

/** A dependency range rewritten to the latest published version. */
export type IntlayerDependencyUpgrade = IntlayerDependency & {
  packageJsonPath: string;
  /** Range written back to the `package.json`, e.g. `^9.5.7`. */
  nextRange: string;
};

/**
 * Ranges that do not point to the registry (monorepo workspaces, local links,
 * aliases, catalogs, git…). They are managed by the user and never rewritten.
 */
const isRegistryRange = (range: string): boolean =>
  /^[\^~]?\d/.test(range.trim());

/**
 * Lists every `package.json` of the project (root first), skipping
 * `node_modules` and build outputs.
 */
export const findPackageJsonFiles = async (
  rootDir: string
): Promise<string[]> => {
  const packageJsonFiles = await fg('**/package.json', {
    cwd: rootDir,
    ignore: [...EXCLUDED_PATHS, '**/.git/**'],
  });

  return packageJsonFiles.sort((first, second) =>
    first === 'package.json'
      ? -1
      : second === 'package.json'
        ? 1
        : first.localeCompare(second)
  );
};

/**
 * Lists the Intlayer packages (`intlayer`, `@intlayer/*`, `*-intlayer`,
 * `intlayer-*`) declared with a registry range in a parsed `package.json`.
 */
export const getIntlayerDependencies = (
  packageJson: Partial<Record<DependencyField, Record<string, string>>>
): IntlayerDependency[] =>
  DEPENDENCY_FIELDS.flatMap((dependencyField) =>
    Object.entries(packageJson[dependencyField] ?? {})
      .filter(
        ([packageName, range]) =>
          isIntlayerPackageName(packageName) && isRegistryRange(range)
      )
      .map(([packageName, currentRange]) => ({
        packageName,
        dependencyField,
        currentRange,
      }))
  );

/** Lists the Intlayer dependencies of every `package.json` of the project. */
export const listIntlayerDependencies = async (
  rootDir: string
): Promise<PackageJsonIntlayerDependencies[]> => {
  const packageJsonPaths = await findPackageJsonFiles(rootDir);

  const results = await Promise.all(
    packageJsonPaths.map(async (packageJsonPath) => {
      try {
        const packageJson = JSON.parse(
          await readFile(join(rootDir, packageJsonPath), 'utf8')
        );
        return {
          packageJsonPath,
          dependencies: getIntlayerDependencies(packageJson),
        };
      } catch {
        return { packageJsonPath, dependencies: [] };
      }
    })
  );

  return results.filter(({ dependencies }) => dependencies.length > 0);
};

/**
 * Fetches the `latest` dist-tag of a package from the npm registry. Resolves to
 * `null` when the registry cannot be reached or the package is not published.
 */
export const fetchLatestPackageVersion = async (
  packageName: string,
  registryUrl: string = 'https://registry.npmjs.org'
): Promise<string | null> => {
  try {
    const response = await fetch(
      `${registryUrl}/${packageName.replace('/', '%2F')}/latest`,
      { signal: AbortSignal.timeout(10_000) }
    );
    if (!response.ok) return null;

    const { version } = (await response.json()) as { version?: unknown };
    return typeof version === 'string' ? version : null;
  } catch {
    return null;
  }
};

/**
 * Keeps the range operator (`^`, `~` or none) of `currentRange` and points it
 * to `version`.
 *
 * @example toRange('^9.0.0', '9.5.7') // '^9.5.7'
 */
export const toRange = (currentRange: string, version: string): string =>
  `${currentRange.trim().match(/^[\^~]/)?.[0] ?? ''}${version}`;

/**
 * Computes the upgrades bringing every listed dependency to its latest version.
 * Dependencies already on the latest version, or whose latest version could not
 * be fetched, are left out.
 */
export const getIntlayerDependencyUpgrades = (
  packageJsonDependencies: PackageJsonIntlayerDependencies[],
  latestVersions: Map<string, string | null>
): IntlayerDependencyUpgrade[] =>
  packageJsonDependencies.flatMap(({ packageJsonPath, dependencies }) =>
    dependencies.flatMap((dependency) => {
      const latestVersion = latestVersions.get(dependency.packageName);

      if (
        !latestVersion ||
        normalizeVersion(dependency.currentRange) ===
          normalizeVersion(latestVersion)
      ) {
        return [];
      }

      return [
        {
          ...dependency,
          packageJsonPath,
          nextRange: toRange(dependency.currentRange, latestVersion),
        },
      ];
    })
  );

/**
 * Writes the upgraded ranges back to their `package.json`, keeping the file's
 * indentation and trailing newline.
 */
export const writeIntlayerDependencyUpgrades = async (
  rootDir: string,
  upgrades: IntlayerDependencyUpgrade[]
): Promise<void> => {
  const packageJsonPaths = [
    ...new Set(upgrades.map(({ packageJsonPath }) => packageJsonPath)),
  ];

  for (const packageJsonPath of packageJsonPaths) {
    const absolutePath = join(rootDir, packageJsonPath);
    const content = await readFile(absolutePath, 'utf8');
    const packageJson = JSON.parse(content);

    for (const upgrade of upgrades) {
      if (upgrade.packageJsonPath !== packageJsonPath) continue;
      packageJson[upgrade.dependencyField][upgrade.packageName] =
        upgrade.nextRange;
    }

    const indentation = content.match(/^[ \t]+(?=")/m)?.[0] ?? 2;
    const trailingNewline = content.endsWith('\n') ? '\n' : '';

    await writeFile(
      absolutePath,
      `${JSON.stringify(packageJson, null, indentation)}${trailingNewline}`,
      'utf8'
    );
  }
};
