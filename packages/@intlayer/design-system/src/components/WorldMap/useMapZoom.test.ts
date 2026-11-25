import { describe, expect, it } from 'vitest';
import {
  clampMapTransform,
  MAX_MAP_SCALE,
  zoomMapTransform,
} from './useMapZoom';

const WIDTH = 960;
const HEIGHT = 470;
const identity = { scale: 1, translateX: 0, translateY: 0 };

describe('zoomMapTransform', () => {
  it('keeps the anchor point fixed under the cursor', () => {
    const zoomed = zoomMapTransform(identity, 2, 300, 200, WIDTH, HEIGHT);

    // The viewBox point under (300, 200) before is still there after.
    expect((300 - zoomed.translateX) / zoomed.scale).toBeCloseTo(300);
    expect((200 - zoomed.translateY) / zoomed.scale).toBeCloseTo(200);
  });

  it('clamps the scale between 1 and the maximum', () => {
    expect(zoomMapTransform(identity, 0.5, 0, 0, WIDTH, HEIGHT)).toEqual(
      identity
    );
    expect(zoomMapTransform(identity, 1000, 0, 0, WIDTH, HEIGHT).scale).toBe(
      MAX_MAP_SCALE
    );
  });
});

describe('clampMapTransform', () => {
  it('never pans an edge of the map inside the frame', () => {
    expect(
      clampMapTransform(
        { scale: 2, translateX: 50, translateY: -1000 },
        WIDTH,
        HEIGHT
      )
    ).toEqual({ scale: 2, translateX: 0, translateY: HEIGHT - HEIGHT * 2 });
  });
});
