import { describe, expect, it } from 'vitest';
import { resampleValues } from './useAnimatedRatios';

describe('resampleValues', () => {
  it('keeps a series of the requested length', () => {
    expect(resampleValues([0, 0.5, 1], 3)).toEqual([0, 0.5, 1]);
  });

  it('upsamples by linear interpolation', () => {
    expect(resampleValues([0, 1], 5)).toEqual([0, 0.25, 0.5, 0.75, 1]);
  });

  it('downsamples while keeping both ends', () => {
    expect(resampleValues([0, 0.2, 0.4, 0.6, 0.8], 3)).toEqual([0, 0.4, 0.8]);
  });

  it('handles empty, single-point and zero-length cases', () => {
    expect(resampleValues([], 3)).toEqual([0, 0, 0]);
    expect(resampleValues([0.7], 2)).toEqual([0.7, 0.7]);
    expect(resampleValues([0.1, 0.9], 0)).toEqual([]);
  });
});
