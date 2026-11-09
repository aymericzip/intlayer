import type { AudienceRange } from '@intlayer/backend-contract/analytics';

/** Days of history each audience range covers. */
const RANGE_COVERAGE_DAYS: Record<AudienceRange, number> = {
  live: 0,
  '1h': 0,
  '24h': 1,
  '7d': 7,
  '30d': 30,
  '90d': 90,
  '6mo': 182,
  '1y': 365,
  '3y': 1095,
};

/** Ranges up to this coverage are always offered, whatever the history. */
const ALWAYS_AVAILABLE_COVERAGE_DAYS = 30;

const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

/**
 * Number of UTC days with collected data, today included.
 *
 * @param dataSince - First day with data, `YYYY-MM-DD`.
 */
export const getCollectedDayCount = (dataSince: string, now: Date): number => {
  const firstDay = Date.parse(`${dataSince}T00:00:00Z`);

  if (Number.isNaN(firstDay)) return 0;

  const today = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate()
  );

  return Math.max(0, Math.floor((today - firstDay) / MILLISECONDS_PER_DAY) + 1);
};

/**
 * Keeps the ranges worth offering: a long range is dropped when the shorter
 * range before it already covers every collected day (one month of data
 * hides `90d`, `6mo`, `1y` and `3y`).
 *
 * @param ranges - Candidate ranges, shortest first.
 * @param dataSince - First day with data, `null`/`undefined` when unknown.
 */
export const getAvailableAudienceRanges = <TRange extends AudienceRange>(
  ranges: readonly TRange[],
  dataSince: string | null | undefined,
  now: Date = new Date()
): TRange[] => {
  const collectedDayCount = dataSince
    ? getCollectedDayCount(dataSince, now)
    : 0;

  return ranges.filter((range, index) => {
    if (RANGE_COVERAGE_DAYS[range] <= ALWAYS_AVAILABLE_COVERAGE_DAYS) {
      return true;
    }

    const previousRange = ranges[index - 1];
    const previousCoverageDays = previousRange
      ? RANGE_COVERAGE_DAYS[previousRange]
      : 0;

    return collectedDayCount > previousCoverageDays;
  });
};
