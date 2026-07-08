import { describe, expect, it } from 'vitest';
import { isSampledIn } from './sampling';

describe('isSampledIn', () => {
  it('keeps every session at rate 1', () => {
    expect(isSampledIn('sid-1', 1)).toBe(true);
  });

  it('drops every session at rate 0', () => {
    expect(isSampledIn('sid-1', 0)).toBe(false);
  });

  it('is stable for the same session', () => {
    expect(isSampledIn('sid-1', 0.5)).toBe(isSampledIn('sid-1', 0.5));
  });

  it('keeps roughly the configured fraction across many sessions', () => {
    let kept = 0;
    const total = 5000;
    for (let index = 0; index < total; index++) {
      if (isSampledIn(`sid-${index}`, 0.3)) kept++;
    }
    expect(kept / total).toBeGreaterThan(0.25);
    expect(kept / total).toBeLessThan(0.35);
  });
});
