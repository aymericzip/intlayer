import { createServerFn } from '@tanstack/react-start';
import { staticFunctionMiddleware } from '@tanstack/start-static-server-functions';

/** Upper bound on each upstream call, so a stalled API cannot hang a doc. */
const REQUEST_TIMEOUT_MS = 5000;

/** Entries kept per memo, the oldest is evicted first. */
const MAX_MEMOIZED_ENTRIES = 500;

/** How long a resolved count is served from memory. */
const REVALIDATION_INTERVAL_MS = 24 * 60 * 60 * 1000;

/** `owner/name`, as GitHub allows them. Anything else never reaches the API. */
const GITHUB_REPOSITORY_PATTERN = /^[\w.-]+\/[\w.-]+$/;

/** npm package name, optionally scoped. */
const NPM_PACKAGE_PATTERN =
  /^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/;

/**
 * Length in days of each selectable period. npm only knows `last-week`,
 * `last-month` and `last-year` by name (`last-6-months` silently answers with
 * a single zero from 2015), so every period is sent as an explicit date range.
 */
const NPM_DOWNLOAD_PERIOD_DAYS = {
  'last-week': 7,
  'last-month': 30,
  'last-6-months': 182,
  'last-year': 365,
} as const;

export type NpmDownloadPeriod = keyof typeof NPM_DOWNLOAD_PERIOD_DAYS;

export const NPM_DOWNLOAD_PERIODS = Object.keys(
  NPM_DOWNLOAD_PERIOD_DAYS
) as NpmDownloadPeriod[];

const DAY_IN_MS = 24 * 60 * 60 * 1000;

/** `YYYY-MM-DD` in UTC, the date format of the npm range endpoint. */
const toNpmDate = (date: Date): string => date.toISOString().slice(0, 10);

/** `start:end` range covering `period`, ending yesterday (npm's last full day). */
const getNpmDateRange = (period: NpmDownloadPeriod): string => {
  const endDate = new Date(Date.now() - DAY_IN_MS);
  const startDate = new Date(
    endDate.getTime() - (NPM_DOWNLOAD_PERIOD_DAYS[period] - 1) * DAY_IN_MS
  );

  return `${toNpmDate(startDate)}:${toNpmDate(endDate)}`;
};

export type RepositoryCommitCount = {
  /** `owner/name` of the repository. */
  repository: string;
  /** Commits on the default branch, `null` when GitHub could not answer. */
  commitCount: number | null;
};

export type PackageDownloadCount = {
  packageName: string;
  /** Downloads over the requested period, `null` when npm could not answer. */
  downloadCount: number | null;
};

export type PeriodDownloadCounts = {
  /** `start:end` the counts cover, as sent to npm. */
  dateRange: string;
  downloadCounts: PackageDownloadCount[];
};

type MemoizedValue<Value> = {
  readonly value: Promise<Value | null>;
  readonly fetchedAt: number;
};

/**
 * Keys a fetcher by its argument and serves every visitor from the same result
 * for a day, so a popular doc page calls GitHub (60 unauthenticated requests
 * an hour) once a day rather than once per page view. Failures are not
 * memoized, the next caller retries them.
 */
const createDailyMemo = <Value>(
  fetchValue: (key: string) => Promise<Value | null>
): ((key: string) => Promise<Value | null>) => {
  const memoizedValues = new Map<string, MemoizedValue<Value>>();

  return async (key) => {
    const now = Date.now();
    const cached = memoizedValues.get(key);

    if (cached && now - cached.fetchedAt < REVALIDATION_INTERVAL_MS) {
      return cached.value;
    }

    const memoized: MemoizedValue<Value> = {
      value: fetchValue(key),
      fetchedAt: now,
    };
    memoizedValues.delete(key);
    memoizedValues.set(key, memoized);

    if (memoizedValues.size > MAX_MEMOIZED_ENTRIES) {
      const oldestKey = memoizedValues.keys().next().value;
      if (oldestKey !== undefined) memoizedValues.delete(oldestKey);
    }

    const value = await memoized.value;

    if (value === null && memoizedValues.get(key) === memoized) {
      memoizedValues.delete(key);
    }

    return value;
  };
};

/**
 * Counts the commits of a repository's default branch. With one commit per
 * page, the page number of the `rel="last"` link is the commit count.
 */
const fetchCommitCount = async (repository: string): Promise<number | null> => {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${repository}/commits?per_page=1`,
      {
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
        headers: { Accept: 'application/vnd.github+json' },
      }
    );

    if (!response.ok) {
      await response.body?.cancel();
      return null;
    }

    const lastPageMatch = response.headers
      .get('link')
      ?.match(/[?&]page=(\d+)>;\s*rel="last"/);

    if (lastPageMatch) {
      await response.body?.cancel();
      return Number(lastPageMatch[1]);
    }

    // No pagination: the repository holds at most one commit
    const commits: unknown[] = await response.json();
    return commits.length;
  } catch (error) {
    console.error(`Error fetching commit count of ${repository}:`, error);
    return null;
  }
};

type NpmDownloadRange = {
  downloads?: { downloads: number; day: string }[];
};

/** Sums the daily downloads of `<start>:<end>/<package>`. */
const fetchDownloadCount = async (
  rangeAndPackageName: string
): Promise<number | null> => {
  try {
    const response = await fetch(
      `https://api.npmjs.org/downloads/range/${rangeAndPackageName}`,
      { signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) }
    );

    if (!response.ok) {
      await response.body?.cancel();
      return null;
    }

    const range: NpmDownloadRange = await response.json();

    if (!Array.isArray(range.downloads)) return null;

    return range.downloads.reduce(
      (total, { downloads }) => total + downloads,
      0
    );
  } catch (error) {
    console.error(`Error fetching downloads of ${rangeAndPackageName}:`, error);
    return null;
  }
};

const fetchCommitCountCached = createDailyMemo(fetchCommitCount);
const fetchDownloadCountCached = createDailyMemo(fetchDownloadCount);

/**
 * Commit count of each GitHub repository, for the doc comparison charts.
 *
 * Baked at prerender (`staticFunctionMiddleware`): the chart suspends during
 * SSR, so the build runs this once per page and the browser reads the payload.
 */
export const loadCommitCounts = createServerFn({ method: 'GET' })
  .middleware([staticFunctionMiddleware])
  .validator((data: { repositories: string[] }) => ({
    repositories: data.repositories.filter((repository) =>
      GITHUB_REPOSITORY_PATTERN.test(repository)
    ),
  }))
  .handler(({ data: { repositories } }): Promise<RepositoryCommitCount[]> =>
    Promise.all(
      repositories.map(async (repository) => ({
        repository,
        commitCount: await fetchCommitCountCached(repository),
      }))
    )
  );

/** Downloads of every package over `period`, for the range they were counted. */
const getDownloadCountsOfPeriod = async (
  packageNames: string[],
  period: NpmDownloadPeriod
): Promise<PeriodDownloadCounts> => {
  const dateRange = getNpmDateRange(period);

  return {
    dateRange,
    downloadCounts: await Promise.all(
      packageNames.map(async (packageName) => ({
        packageName,
        downloadCount: await fetchDownloadCountCached(
          `${dateRange}/${packageName}`
        ),
      }))
    ),
  };
};

/**
 * npm downloads of each package over every selectable period, for the doc
 * comparison charts.
 *
 * All periods travel in one payload so that switching period never leaves the
 * prerendered data: the build bakes it like {@link loadCommitCounts}.
 */
export const loadDownloadCounts = createServerFn({ method: 'GET' })
  .middleware([staticFunctionMiddleware])
  .validator((data: { packageNames: string[] }) => ({
    packageNames: data.packageNames.filter((packageName) =>
      NPM_PACKAGE_PATTERN.test(packageName)
    ),
  }))
  .handler(
    async ({
      data: { packageNames },
    }): Promise<Record<NpmDownloadPeriod, PeriodDownloadCounts>> => {
      const periodDownloadCounts = await Promise.all(
        NPM_DOWNLOAD_PERIODS.map(
          async (period) =>
            [
              period,
              await getDownloadCountsOfPeriod(packageNames, period),
            ] as const
        )
      );

      return Object.fromEntries(periodDownloadCounts) as Record<
        NpmDownloadPeriod,
        PeriodDownloadCounts
      >;
    }
  );
