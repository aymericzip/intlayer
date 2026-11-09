import { describe, expect, it } from 'vitest';
import {
  getAvailableAudienceRanges,
  getCollectedDayCount,
} from './audienceRanges';

const ALL_RANGES = [
  'live',
  '1h',
  '24h',
  '7d',
  '30d',
  '90d',
  '6mo',
  '1y',
  '3y',
] as const;

const NOW = new Date('2026-11-09T15:00:00Z');

describe('getCollectedDayCount', () => {
  it('counts today as a collected day', () => {
    expect(getCollectedDayCount('2026-11-09', NOW)).toBe(1);
    expect(getCollectedDayCount('2026-10-10', NOW)).toBe(31);
  });

  it('returns 0 for an invalid date', () => {
    expect(getCollectedDayCount('not-a-day', NOW)).toBe(0);
  });
});

describe('getAvailableAudienceRanges', () => {
  it('hides ranges past 30 days with one month of data', () => {
    expect(getAvailableAudienceRanges(ALL_RANGES, '2026-10-11', NOW)).toEqual([
      'live',
      '1h',
      '24h',
      '7d',
      '30d',
    ]);
  });

  it('offers the next range once data outgrows the previous one', () => {
    expect(getAvailableAudienceRanges(ALL_RANGES, '2026-10-01', NOW)).toEqual([
      'live',
      '1h',
      '24h',
      '7d',
      '30d',
      '90d',
    ]);
    expect(getAvailableAudienceRanges(ALL_RANGES, '2025-06-01', NOW)).toEqual(
      ALL_RANGES
    );
  });

  it('keeps the short ranges without any data', () => {
    expect(getAvailableAudienceRanges(ALL_RANGES, null, NOW)).toEqual([
      'live',
      '1h',
      '24h',
      '7d',
      '30d',
    ]);
  });
});
