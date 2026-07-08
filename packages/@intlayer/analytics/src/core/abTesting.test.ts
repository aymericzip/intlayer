import { describe, expect, it } from 'vitest';
import { assignVariant } from './abTesting';

describe('assignVariant', () => {
  it('is deterministic for the same session + experiment', () => {
    const first = assignVariant('sid-1', 'exp', ['a', 'b']);
    const second = assignVariant('sid-1', 'exp', ['a', 'b']);
    expect(first).toBe(second);
  });

  it('returns the single variant when only one is provided', () => {
    expect(assignVariant('sid-1', 'exp', ['only'])).toBe('only');
  });

  it('throws when no variants are provided', () => {
    expect(() => assignVariant('sid-1', 'exp', [])).toThrow();
  });

  it('only ever returns one of the provided variants', () => {
    const variants = ['a', 'b', 'c'];
    for (let index = 0; index < 200; index++) {
      const variant = assignVariant(`sid-${index}`, 'exp', variants);
      expect(variants).toContain(variant);
    }
  });

  it('produces a roughly uniform split across many sessions', () => {
    const counts = { a: 0, b: 0 };
    const total = 4000;
    for (let index = 0; index < total; index++) {
      counts[assignVariant(`sid-${index}`, 'exp', ['a', 'b']) as 'a' | 'b']++;
    }
    // Expect each bucket within 10% of 50/50.
    expect(counts.a / total).toBeGreaterThan(0.4);
    expect(counts.a / total).toBeLessThan(0.6);
  });

  it('respects weights (90/10 rollout skews heavily to the first variant)', () => {
    let firstCount = 0;
    const total = 4000;
    for (let index = 0; index < total; index++) {
      if (assignVariant(`sid-${index}`, 'exp', ['a', 'b'], [9, 1]) === 'a') {
        firstCount++;
      }
    }
    expect(firstCount / total).toBeGreaterThan(0.8);
  });
});
