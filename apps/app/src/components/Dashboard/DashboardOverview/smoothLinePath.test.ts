import { describe, expect, it } from 'vitest';
import { buildSmoothLinePath } from './smoothLinePath';

/** Extracts every number of an SVG path. */
const getPathNumbers = (path: string): number[] =>
  (path.match(/-?\d+(\.\d+)?/g) ?? []).map(Number);

describe('buildSmoothLinePath', () => {
  it('handles empty and single-point series', () => {
    expect(buildSmoothLinePath([])).toBe('');
    expect(buildSmoothLinePath([[10, 20]])).toBe('M10,20');
  });

  it('draws one cubic segment per gap between points', () => {
    const path = buildSmoothLinePath([
      [0, 100],
      [50, 40],
      [100, 70],
    ]);

    expect(path.startsWith('M0,100 ')).toBe(true);
    expect(path.match(/C/g)).toHaveLength(2);
    expect(path.endsWith(' 100,70')).toBe(true);
  });

  it('keeps a straight line straight', () => {
    expect(
      buildSmoothLinePath([
        [0, 0],
        [30, 30],
      ])
    ).toBe('M0,0 C10,10 20,20 30,30');
  });

  it('never overshoots the data range (zeros stay on the baseline)', () => {
    const baselineY = 140;
    const peakY = 10;
    const path = buildSmoothLinePath([
      [0, baselineY],
      [20, baselineY],
      [40, peakY],
      [60, baselineY],
      [80, baselineY],
    ]);

    const yValues = getPathNumbers(path).filter((_value, index) => index % 2);

    expect(Math.max(...yValues)).toBeLessThanOrEqual(baselineY);
    expect(Math.min(...yValues)).toBeGreaterThanOrEqual(peakY);
  });
});
