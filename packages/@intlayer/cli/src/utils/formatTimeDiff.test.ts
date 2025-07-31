import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { formatTimeDiff } from './formatTimeDiff';

describe('formatTimeDiff', () => {
  const fixedNow = new Date('2025-01-01T00:00:00Z');

  beforeEach(() => {
    // Use fake timers so "now" is deterministic across tests
    vi.useFakeTimers();
    vi.setSystemTime(fixedNow);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('formats differences containing days', () => {
    // 2 days, 3 hours, 4 minutes, 5 seconds ago
    const past = new Date(
      2 * 24 * 60 * 60 * 1000 + // 2 days
        3 * 60 * 60 * 1000 + // 3 hours
        4 * 60 * 1000 + // 4 minutes
        5 * 1000 // 5 seconds
    );

    expect(formatTimeDiff(past)).toBe('2d 3h 4m 5s');
  });

  it('formats differences containing hours but no days', () => {
    // 3 hours, 15 minutes, 20 seconds ago
    const past = new Date(3 * 60 * 60 * 1000 + 15 * 60 * 1000 + 20 * 1000);

    expect(formatTimeDiff(past)).toBe('3h 15m 20s');
  });

  it('formats differences containing only minutes and seconds', () => {
    // 7 minutes, 45 seconds ago
    const past = new Date(7 * 60 * 1000 + 45 * 1000);

    expect(formatTimeDiff(past)).toBe('7m 45s');
  });
});
