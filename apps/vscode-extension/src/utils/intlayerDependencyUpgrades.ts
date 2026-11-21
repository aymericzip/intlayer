import { compareVersions } from '@intlayer/config/utils';
import {
  fetchLatestPackageVersion,
  getIntlayerDependencies,
  type IntlayerDependency,
  toRange,
} from '@intlayer/engine/cli';

/** How long a fetched `latest` version is reused before asking npm again. */
const LATEST_VERSION_TTL = 60 * 60 * 1000;

/** An Intlayer dependency range of a `package.json` older than `latest`. */
export type OutdatedIntlayerDependency = IntlayerDependency & {
  /** Range the dependency is upgraded to, e.g. `^9.8.3`. */
  nextRange: string;
  /** Offset of the range text (without quotes) in the `package.json`. */
  rangeStartOffset: number;
  /** Offset right after the range text (without quotes). */
  rangeEndOffset: number;
};

/** Reduces a range or version to its `major.minor.patch` core. */
const getVersionCore = (version: string): string | undefined =>
  version.match(/\d+\.\d+\.\d+/)?.[0];

/** Intlayer dependencies of a `package.json` text, none while it is unparsable. */
const parseIntlayerDependencies = (
  packageJsonText: string
): IntlayerDependency[] => {
  try {
    return getIntlayerDependencies(JSON.parse(packageJsonText));
  } catch {
    // Being edited
    return [];
  }
};

const escapeRegExp = (text: string): string =>
  text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Text span of the object value of a top-level dependency field, e.g. the
 * `{ … }` of `"dependencies": { … }`. Dependency maps are flat, so the first
 * closing brace ends it.
 */
const findDependencyFieldSpan = (
  packageJsonText: string,
  dependencyField: IntlayerDependency['dependencyField']
): { start: number; end: number } | undefined => {
  const fieldMatch = new RegExp(`"${dependencyField}"\\s*:\\s*\\{`).exec(
    packageJsonText
  );

  if (!fieldMatch) return undefined;

  const start = fieldMatch.index + fieldMatch[0].length;
  const end = packageJsonText.indexOf('}', start);

  return end === -1 ? undefined : { start, end };
};

/**
 * Lists the Intlayer dependencies of a `package.json` whose range is older
 * than the `latest` version, with the offsets of their range text. Packages
 * missing from `latestVersions` (unknown or not fetched) are left out.
 */
export const findOutdatedIntlayerDependencies = (
  packageJsonText: string,
  latestVersions: ReadonlyMap<string, string | null>
): OutdatedIntlayerDependency[] =>
  parseIntlayerDependencies(packageJsonText).flatMap((dependency) => {
    const latestVersion = latestVersions.get(dependency.packageName);
    const currentVersionCore = getVersionCore(dependency.currentRange);
    const latestVersionCore = latestVersion && getVersionCore(latestVersion);

    if (
      !latestVersion ||
      !currentVersionCore ||
      !latestVersionCore ||
      !compareVersions(currentVersionCore, '<', latestVersionCore)
    ) {
      return [];
    }

    const fieldSpan = findDependencyFieldSpan(
      packageJsonText,
      dependency.dependencyField
    );

    if (!fieldSpan) return [];

    const entryMatch = new RegExp(
      `"${escapeRegExp(dependency.packageName)}"\\s*:\\s*"(${escapeRegExp(dependency.currentRange)})"`
    ).exec(packageJsonText.slice(fieldSpan.start, fieldSpan.end));

    if (!entryMatch) return [];

    // The range is the last thing before the closing quote of the entry
    const rangeEndOffset =
      fieldSpan.start + entryMatch.index + entryMatch[0].length - 1;

    return [
      {
        ...dependency,
        nextRange: toRange(dependency.currentRange, latestVersion),
        rangeStartOffset: rangeEndOffset - dependency.currentRange.length,
        rangeEndOffset,
      },
    ];
  });

/** Cached `latest` version lookups, shared by every open `package.json`. */
const latestVersionCache = new Map<
  string,
  { fetchedAt: number; version: Promise<string | null> }
>();

/**
 * `latest` version of a package on npm, cached for {@link LATEST_VERSION_TTL}.
 * Failed lookups resolve to `null` and are retried on the next call.
 */
export const getCachedLatestPackageVersion = (
  packageName: string
): Promise<string | null> => {
  const cachedEntry = latestVersionCache.get(packageName);

  if (cachedEntry && Date.now() - cachedEntry.fetchedAt < LATEST_VERSION_TTL) {
    return cachedEntry.version;
  }

  const version = fetchLatestPackageVersion(packageName).then(
    (latestVersion) => {
      if (latestVersion === null) latestVersionCache.delete(packageName);
      return latestVersion;
    }
  );

  latestVersionCache.set(packageName, { fetchedAt: Date.now(), version });

  return version;
};

/** `latest` versions of the Intlayer packages declared in a `package.json`. */
export const getLatestIntlayerVersions = async (
  packageJsonText: string
): Promise<Map<string, string | null>> => {
  const packageNames = [
    ...new Set(
      parseIntlayerDependencies(packageJsonText).map(
        ({ packageName }) => packageName
      )
    ),
  ];

  return new Map(
    await Promise.all(
      packageNames.map(
        async (packageName) =>
          [
            packageName,
            await getCachedLatestPackageVersion(packageName),
          ] as const
      )
    )
  );
};
