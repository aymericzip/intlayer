import { describe, expect, it } from 'vitest';
import type { AudienceSeriesPoint } from '@/types/analytics.types';
import {
  audienceRangeFromDays,
  bucketDailySeries,
  buildBreakdownRows,
  DEFAULT_AUDIENCE_RANGE,
  isAudienceRange,
} from './analytics.service';

/** Builds a daily series point with distinguishable users / views. */
const point = (
  bucket: string,
  users: number,
  views: number
): AudienceSeriesPoint => ({ bucket, users, views });

describe('isAudienceRange', () => {
  it('accepts every supported range', () => {
    for (const range of ['1h', '24h', '7d', '30d', '90d', '6mo', '1y', '3y']) {
      expect(isAudienceRange(range)).toBe(true);
    }
  });

  it('rejects unknown values, including inherited object keys', () => {
    expect(isAudienceRange('2h')).toBe(false);
    expect(isAudienceRange('')).toBe(false);
    expect(isAudienceRange('toString')).toBe(false);
    expect(isAudienceRange('constructor')).toBe(false);
  });
});

describe('audienceRangeFromDays', () => {
  it('maps a legacy window onto the narrowest range that covers it', () => {
    expect(audienceRangeFromDays(1)).toBe('7d');
    expect(audienceRangeFromDays(7)).toBe('7d');
    expect(audienceRangeFromDays(8)).toBe('30d');
    expect(audienceRangeFromDays(30)).toBe('30d');
    expect(audienceRangeFromDays(90)).toBe('90d');
    expect(audienceRangeFromDays(183)).toBe('6mo');
    expect(audienceRangeFromDays(365)).toBe('1y');
  });

  it('clamps windows longer than the widest range', () => {
    expect(audienceRangeFromDays(1095)).toBe('3y');
    expect(audienceRangeFromDays(10_000)).toBe('3y');
  });

  it('never returns a sub-day range, which legacy clients cannot request', () => {
    expect(audienceRangeFromDays(0)).toBe('7d');
    expect(audienceRangeFromDays(-5)).toBe('7d');
  });

  it('agrees with the default range for the historical default window', () => {
    expect(audienceRangeFromDays(30)).toBe(DEFAULT_AUDIENCE_RANGE);
  });
});

describe('bucketDailySeries', () => {
  const daily = [
    // Sunday, closing the ISO week that started Mon 2026-01-05.
    point('2026-01-11', 1, 10),
    // Monday, opening the next ISO week.
    point('2026-01-12', 2, 20),
    point('2026-01-13', 4, 40),
    // Next month.
    point('2026-02-02', 8, 80),
  ];

  it('returns the daily points untouched at day granularity', () => {
    expect(bucketDailySeries(daily, 'day')).toBe(daily);
  });

  it('groups by ISO week, starting each bucket on its Monday', () => {
    expect(bucketDailySeries(daily, 'week')).toEqual([
      point('2026-01-05', 1, 10),
      point('2026-01-12', 6, 60),
      point('2026-02-02', 8, 80),
    ]);
  });

  it('groups by calendar month, anchored to the first of the month', () => {
    expect(bucketDailySeries(daily, 'month')).toEqual([
      point('2026-01-01', 7, 70),
      point('2026-02-01', 8, 80),
    ]);
  });

  it('keeps buckets in chronological order', () => {
    const buckets = bucketDailySeries(daily, 'week').map((row) => row.bucket);
    expect(buckets).toEqual([...buckets].sort());
  });

  it('does not mutate the input points', () => {
    const input = [point('2026-01-12', 2, 20), point('2026-01-13', 4, 40)];
    bucketDailySeries(input, 'week');
    expect(input).toEqual([
      point('2026-01-12', 2, 20),
      point('2026-01-13', 4, 40),
    ]);
  });

  it('handles an empty series', () => {
    expect(bucketDailySeries([], 'month')).toEqual([]);
  });
});

describe('buildBreakdownRows', () => {
  it('merges both sides, defaulting a key missing from one to zero', () => {
    const rows = buildBreakdownRows(
      new Map([
        ['fr', 3],
        ['en', 1],
      ]),
      new Map([
        ['fr', 30],
        ['de', 5],
      ])
    );

    expect(rows).toEqual([
      { key: 'fr', users: 3, views: 30 },
      { key: 'de', users: 0, views: 5 },
      { key: 'en', users: 1, views: 0 },
    ]);
  });

  it('ranks by views by default, breaking ties on users', () => {
    const rows = buildBreakdownRows(
      new Map([
        ['/a', 1],
        ['/b', 9],
      ]),
      new Map([
        ['/a', 10],
        ['/b', 10],
      ])
    );

    expect(rows.map((row) => row.key)).toEqual(['/b', '/a']);
  });

  it('ranks by users when asked, breaking ties on views', () => {
    const rows = buildBreakdownRows(
      new Map([
        ['FR', 2],
        ['US', 7],
      ]),
      new Map([['FR', 100]]),
      'users'
    );

    expect(rows.map((row) => row.key)).toEqual(['US', 'FR']);
  });

  it('drops empty keys — an event with no locale or no url is not a bucket', () => {
    const rows = buildBreakdownRows(new Map([['', 5]]), new Map([['', 50]]));

    expect(rows).toEqual([]);
  });

  it('caps the number of rows so an unbounded page dimension stays readable', () => {
    const views = new Map(
      Array.from({ length: 400 }, (_, index) => [`/page-${index}`, index])
    );

    const rows = buildBreakdownRows(new Map(), views);

    expect(rows).toHaveLength(250);
    // The cap keeps the head of the ranking, not an arbitrary slice.
    expect(rows[0]).toEqual({ key: '/page-399', users: 0, views: 399 });
  });

  it('handles two empty sides', () => {
    expect(buildBreakdownRows(new Map(), new Map())).toEqual([]);
  });
});
